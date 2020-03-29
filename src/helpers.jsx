import React from 'react'

export const NOOP = () => null

export const PageLimit = ({ value, onChange }) => (
  <select
    className='react-dynamic-table-page-limit'
    onChange={onChange} value={value}
  >
    <option value={5}>5</option>
    <option value={10}>10</option>
    <option value={15}>15</option>
    <option value={20}>20</option>
  </select>
)

export const Pages = ({ value, total = 1, delta = 5, onChange }) => {
  if (total <= 1) {
    return null
  }

  const pages = []

  for (let i = 1; i < total; i++) {
    const next = pages[pages.length - 1] + 1

    if ([0, total].includes(i) || Math.abs(value - i) <= delta) {
      if (pages.length >= 1 && i !== next) {
        pages.push(`pad-${i}`)
      }

      pages.push(i)
    }
  }

  return (
    <div className='react-dynamic-table-pages'>
      <a onClick={() => onChange(value - 1)}>
        Previous
      </a>
      {pages.map(page => {
        const pad = `${page}`.includes('pad')

        return (
          <a
            key={page}
            style={{ cursor: !pad || 'not-allowed' }}
            onClick={() => pad || onChange(page)}
          >
            {!pad ? page : '...'}
          </a>
        )
      })}
      <a onClick={() => onChange(value + 1)}>
        Next
      </a>
    </div>
  )
}
