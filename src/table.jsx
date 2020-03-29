import React from 'react'
import { useSetState, useMount } from 'react-use'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { PageLimit, Pages } from './helpers'

const NOOP = () => null

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
    onRowClick,
    onPageLimitChange,
    onPageChange,
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
    const fields = Object.keys(row)

    for (let i = 0; i < fields.length; i++) {
      const field = fields[i]

      // If there are fields to exclude defined, and current field is found then null it
      if (fieldsToExclude.length && fieldsToExclude.indexOf(field) > -1) {
        fields.splice(i, 1, null)

        continue
      }

      // If there are fields to include defined, and current field is not found then null it
      if (fieldsToInclude.length && fieldsToInclude.indexOf(field) < 0) {
        fields.splice(i, 1, null)

        continue
      }
    }

    return (
      fields
        .slice()
        // Sort fields
        .sort((a, b) => (
          fieldOrder.indexOf(b) < fieldOrder.indexOf(a) ? -1 : 0
        ))
        // Filter out nulled fields
        .filter(e => e)
    )
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
              {$headers().map(header => (
                <th key={header}>
                  {header}
                </th>
              ))}
              {!!actions && <th />}
            </tr>
          </thead>
        )}
        <tbody>
          {!rows.length && emptyRow}
          {!!rows.length && rows.map(row => (
            rowRenderer({
              row,
              rowIdentifier,
              fields: state.fields,
              dataManipulator,
              actions,
              onClick: (
                onRowClick !== NOOP
                  ? onRowClick : undefined
              )
            })
          ))}
        </tbody>
        {(footer !== NOOP || pageLimit !== NOOP) && (
          <tfoot>
            {typeof footer === 'function' && (
              footer({
                rows,
                width: state.fields.length + (actions ? 1 : 0)
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
  rowRenderer: ({ row, rowIdentifier, fields, dataManipulator, actions, onClick }) => (
    <tr
      key={rowIdentifier(row)}
      onClick={onClick}
    >
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
  onRowClick: NOOP,
  onPageLimitChange: NOOP,
  onPageChange: NOOP
}

Table.propTypes = {
  rows: PropTypes.arrayOf(PropTypes.object),
  rowIdentifier: PropTypes.func,
  rowRenderer: PropTypes.func,
  emptyRow: PropTypes.node,
  dataManipulator: PropTypes.func,
  //
  fieldMap: PropTypes.object,
  fieldOrder: PropTypes.arrayOf(PropTypes.string),
  fieldsToExclude: PropTypes.arrayOf(PropTypes.string),
  fieldsToInclude: PropTypes.arrayOf(PropTypes.string),
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
  onRowClick: PropTypes.func,
  onPageLimitChange: PropTypes.func,
  onPageChange: PropTypes.func
}

export default Table
