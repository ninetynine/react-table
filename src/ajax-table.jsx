import React from 'react'
import PropTypes from 'prop-types'
import { useSetState, useMount, useUpdateEffect } from 'react-use'
import axios from 'axios'

import { NOOP } from './helpers'
import Table from './table'

const AjaxTable = ({ url, params, responseManipulator, onLoad, rows, loadingRow, emptyRow, ...rest }) => {
  const [state, setState] = useSetState({ loading: true, rows })

  const get = async () => {
    const { data: response } = await axios.get(url, { params })
    const rows = responseManipulator(response)

    setState({ loading: false, rows })
    onLoad(rows)
  }

  // Get rows when mounted
  useMount(() => { get() })

  // Get rows when url or params change
  useUpdateEffect(() => {
    setState({ loading: true })
    get()
  }, [url, params])

  // If rows get overriden externally then store them
  useUpdateEffect(() => {
    setState({ rows })
  }, [rows])

  return (
    <Table
      {...rest}
      rows={!state.loading ? state.rows : []}
      emptyRow={state.loading ? loadingRow : emptyRow}
    />
  )
}

AjaxTable.defaultProps = {
  params: {},
  rows: [],
  loadingRow: (
    <tr>
      <td>Loading...</td>
    </tr>
  ),
  responseManipulator: response => response,
  onLoad: NOOP,
  ...Table.defaultProps
}

AjaxTable.propTypes = {
  url: PropTypes.string.isRequired,
  params: PropTypes.object,
  responseManipulator: PropTypes.func,
  onLoad: PropTypes.func,
  loadingRow: PropTypes.node,
  ...Table.propTypes
}

export default AjaxTable
