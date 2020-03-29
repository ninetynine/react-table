import React from 'react'
import { useSetState, useMount } from 'react-use'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { NOOP, PageLimit, Pages } from './helpers'

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
    onRowCheckboxChange,
    onPageLimitChange,
    onPageChange,
    onMasterCheckboxChange,
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
    state.fields.map(field => (

      // Field field is mapped then use the new name
      // Otherwise attempt to make it friendly to read
      fieldMap[field]
        ? fieldMap[field]
        : field
          .replace(/([A-Z])([A-Z])/g, (_, a, b) => `${a} ${b}`)
          .toLowerCase()
          .replace(/([ -_]|^)(.)/g, (_, a, b) => `${a ? ' ' : ''} ${b.toUpperCase()}`)
    ))
  )

  // Only get fields once mounted
  useMount(() => {
    setState({
      fields: $fields()
    })
  })

  return (
    <div
      {...rest}
      className={classNames([
        className, 'react-dynamic-table'
      ])}
    >
      <table>
        {header && (
          <thead>
            <tr>
              {onRowCheckboxChange !== NOOP && (
                <th>
                  {onMasterCheckboxChange !== NOOP && (
                    <input
                      type='checkbox'
                      checked={masterIsChecked()}
                      onChange={onMasterCheckboxChange}
                    />
                  )}
                </th>
              )}
              {$headers().map(header => (
                <th key={header}>
                  {header}
                </th>
              ))}
              {actions !== null && <th />}
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
                dataManipulator,
                actions,
                isChecked: rowIsChecked(id),
                onClick: (
                  onRowClick !== NOOP
                    ? onRowClick : undefined
                ),
                onToggle: (
                  onRowCheckboxChange !== NOOP
                    ? () => onRowCheckboxChange(id) : undefined
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
                  parseInt(actions !== null) +
                  parseInt(onRowCheckboxChange !== NOOP)
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

Table.pageLimit = PageLimit
Table.pages = Pages

Table.defaultProps = {
  rows: [],
  rowIdentifier: row => row.id,
  rowRenderer: ({ key, row, fields, dataManipulator, actions, isChecked, onClick, onToggle }) => (
    <tr
      key={key}
      onClick={onClick}
    >
      {onToggle && (
        <td>
          <input
            type='checkbox'
            checked={isChecked}
            onChange={onToggle}
          />
        </td>
      )}
      {fields.map(field => (
        <td key={field}>
          {dataManipulator({
            field, value: row[field], row
          })}
        </td>
      ))}
      {actions}
    </tr>
  ),
  emptyRow: (
    <tr>
      <td>There's nothing here.</td>
    </tr>
  ),
  dataManipulator: ({ value }) => (
    value !== null && value !== undefined
      ? value : '-'
  ),
  //
  fieldMap: {},
  fieldOrder: [],
  fieldsToExclude: [],
  fieldsToInclude: [],
  //
  header: true,
  footer: NOOP,
  pageLimit: NOOP,
  pages: NOOP,
  actions: null,
  //
  rowIsChecked: NOOP,
  masterIsChecked: NOOP,
  //
  onRowClick: NOOP,
  onRowCheckboxChange: NOOP,
  onPageLimitChange: NOOP,
  onPageChange: NOOP,
  onMasterCheckboxChange: NOOP
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
  actions: PropTypes.node,
  //
  rowIsChecked: PropTypes.func,
  masterIsChecked: PropTypes.func,
  //
  onRowClick: PropTypes.func,
  onRowCheckboxChange: PropTypes.func,
  onPageLimitChange: PropTypes.func,
  onPageChange: PropTypes.func,
  onMasterCheckboxChange: PropTypes.func
}
