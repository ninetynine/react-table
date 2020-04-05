import React from 'react'
import { useSetState, useMount, useUpdateEffect } from 'react-use'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { NOOP, Row, PageLimit, Pages } from './helpers'

const Table = (
  {
    rows,
    rowRenderer,
    rowIdentifier,
    emptyRow,
    dataManipulator,
    //
    fieldMap,
    fieldOrder,
    fieldWidths,
    fieldsToExclude,
    fieldsToInclude,
    //
    header,
    footer,
    pageLimit,
    pages,
    actions,
    //
    rowIsChecked,
    masterIsChecked,
    //
    onRowClick,
    onRowToggle,
    onPageLimitChange,
    onPageChange,
    onMasterToggle,
    //
    className,
    ...rest
  }
) => {
  const [state, setState] = useSetState({ fields: [] })

  // Return fields
  const $fields = () => {
    if (!rows.length) {
      return []
    }

    const row = rows[0]
    let fields = Object.keys(row)

    // Fields to exclude
    const regexFieldsToExclude = fieldsToExclude.filter(e => typeof e !== 'string')
    const stringFieldsToExclude = fieldsToExclude.filter(e => typeof e === 'string')

    // Fields to include
    const regexFieldsToInclude = fieldsToInclude.filter(e => typeof e !== 'string')
    const stringFieldsToInclude = fieldsToInclude.filter(e => typeof e === 'string')

    for (let i = 0; i < fields.length; i++) {
      const field = fields[i]

      // Check for string exclusions
      if (stringFieldsToExclude.length && stringFieldsToExclude.indexOf(field) > -1) {
        fields.splice(i, 1, null)

        continue
      }

      // Check for regex exclusions
      if (regexFieldsToExclude.length) {
        let found = false

        for (let r = 0; r < regexFieldsToExclude.length; r++) {
          if (regexFieldsToExclude[r].test(field)) {
            fields.splice(i, 1, null)
            found = true

            break
          }
        }

        if (found) {
          continue
        }
      }

      // Check for string inclusions
      if (stringFieldsToInclude.length && stringFieldsToInclude.indexOf(field) < 0) {
        fields.splice(i, 1, null)

        continue
      }

      // Check for regex inclusions
      if (regexFieldsToInclude.length) {
        let found = false

        for (let r = 0; r < regexFieldsToInclude.length; r++) {
          if (!regexFieldsToInclude[r].test(field)) {
            fields.splice(i, 1, null)
            found = true

            break
          }
        }

        if (found) {
          continue
        }
      }
    }

    fields = fields.filter(e => e)

    const ordered = []

    for (let i = 0; i < fields.length; i++) {
      const field = fields[i]
      const index = (
        fieldOrder.findIndex(order => (
          typeof order !== 'string'
            ? order.test(field)
            : order === field
        ))
      )

      if (index > -1) {
        ordered.splice(index, 0, field)
      } else {
        ordered.push(field)
      }
    }

    return ordered
  }

  // Return headers
  const $headers = () => (
    state.fields.map(field => ([
      field,

      // Field field is mapped then use the new name
      // Otherwise attempt to make it friendly to read
      fieldMap[field]
        ? fieldMap[field]
        : field
          .replace(/([A-Z])([A-Z])/g, (_, a, b) => `${a} ${b}`)
          .toLowerCase()
          .replace(/([ -_]|^)(.)/g, (_, a, b) => `${a ? ' ' : ''} ${b.toUpperCase()}`)
    ]))
  )

  // Only get fields once mounted
  useMount(() => {
    setState({
      fields: $fields()
    })
  })

  // Only get fields when rows update
  useUpdateEffect(() => {
    setState({
      fields: $fields()
    })
  }, [rows])

  return (
    <div
      {...rest}
      className={classNames([
        className, 'react-dynamic-table',
        { 'react-dynamic-table-clickable': onRowClick !== NOOP }
      ])}
    >
      <table>
        {header && (
          <thead>
            <tr>
              {onRowToggle !== NOOP && (
                <th>
                  {onMasterToggle !== NOOP && (
                    <input
                      type='checkbox'
                      checked={masterIsChecked()}
                      onChange={onMasterToggle}
                    />
                  )}
                </th>
              )}
              {$headers().map(([field, header]) => (
                <th
                  key={header}
                  width={fieldWidths[field]}
                >
                  {header}
                </th>
              ))}
              {actions !== NOOP && <th />}
            </tr>
          </thead>
        )}
        <tbody>
          {rows.length === 0 && emptyRow}
          {rows.length > 0 && rows.map(row => {
            const id = rowIdentifier(row)

            return (
              rowRenderer({
                key: id,
                row,
                fields: state.fields,
                fieldWidths,
                dataManipulator,
                isChecked: rowIsChecked(id),
                actions: (
                  actions !== NOOP
                    ? actions(row) : undefined
                ),
                onClick: (
                  onRowClick !== NOOP
                    ? event => onRowClick(id, event) : undefined
                ),
                onToggle: (
                  onRowToggle !== NOOP
                    ? () => onRowToggle(id) : undefined
                )
              })
            )
          })}
        </tbody>
        {(footer !== NOOP || pageLimit !== NOOP) && (
          <tfoot>
            {typeof footer === 'function' && (
              footer({
                rows,
                width: (
                  state.fields.length +
                  parseInt(actions !== NOOP) +
                  parseInt(onRowToggle !== NOOP)
                )
              })
            )}
            {typeof footer !== 'function' && footer}
            {(pageLimit !== NOOP || pages !== NOOP) && (
              <tr>
                <td>
                  {typeof pageLimit === 'function' && (
                    pageLimit({
                      onChange: onPageLimitChange
                    })
                  )}
                  {typeof pageLimit !== 'function' && pageLimit}
                </td>
                <td>
                  {typeof pages === 'function' && (
                    pages({
                      onChange: onPageChange
                    })
                  )}
                  {typeof pages !== 'function' && pages}
                </td>
              </tr>
            )}
          </tfoot>
        )}
      </table>
    </div>
  )
}

Table.row = Row
Table.pageLimit = PageLimit
Table.pages = Pages

Table.defaultProps = {
  rows: [],
  rowIdentifier: row => row.id,
  rowRenderer: Row,
  emptyRow: (
    <tr>
      <td>There's nothing here.</td>
    </tr>
  ),
  dataManipulator: ({ value }) => {
    if (value === null || value === undefined) {
      return '-'
    }

    if (!React.isValidElement(value) && typeof value === 'object') {
      return <i>Hidden</i>
    }

    return value
  },
  //
  fieldMap: {},
  fieldOrder: [],
  fieldWidths: {},
  fieldsToExclude: [],
  fieldsToInclude: [],
  //
  header: true,
  footer: NOOP,
  pageLimit: NOOP,
  pages: NOOP,
  actions: NOOP,
  //
  rowIsChecked: NOOP,
  masterIsChecked: NOOP,
  //
  onRowClick: NOOP,
  onRowToggle: NOOP,
  onPageLimitChange: NOOP,
  onPageChange: NOOP,
  onMasterToggle: NOOP
}

Table.propTypes = {
  rows: PropTypes.arrayOf(PropTypes.object),
  rowIdentifier: PropTypes.func,
  rowRenderer: PropTypes.func,
  emptyRow: PropTypes.node,
  dataManipulator: PropTypes.func,
  //
  fieldMap: PropTypes.object,
  fieldOrder: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.instanceOf(RegExp)
    ])
  ),
  fieldWidths: PropTypes.object,
  fieldsToExclude: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.instanceOf(RegExp)
    ])
  ),
  fieldsToInclude: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.instanceOf(RegExp)
    ])
  ),
  //
  header: PropTypes.bool,
  footer: PropTypes.oneOfType([
    PropTypes.node, PropTypes.func
  ]),
  pageLimit: PropTypes.oneOfType([
    PropTypes.node, PropTypes.func
  ]),
  pages: PropTypes.oneOfType([
    PropTypes.node, PropTypes.func
  ]),
  actions: PropTypes.func,
  //
  rowIsChecked: PropTypes.func,
  masterIsChecked: PropTypes.func,
  //
  onRowClick: PropTypes.func,
  onRowToggle: PropTypes.func,
  onPageLimitChange: PropTypes.func,
  onPageChange: PropTypes.func,
  onMasterToggle: PropTypes.func
}

export default Table
