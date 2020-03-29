<div align="center">
  <h1>
    <br/>
    <br/>
    🗃
    <br />
    react-table
    <br />
    <br />
    <br />
    <br />
  </h1>
  <sup>
    <br />
    <br />
    <a href="https://www.npmjs.com/package/react-table" target="_blank">
      <img src="https://badgen.net/npm/v/@ninetynine/react-table" alt="npm version" />
    </a>
    <a href="https://github.com/ninetynine/react-table/blob/master/LICENSE" target="_blank">
      <img src="https://badgen.net/npm/license/@ninetynine/react-table" alt="npm license">
    </a>
    <a href="https://www.npmjs.com/package/react-table" target="_blank">
      <img src="https://badgen.net/npm/dt/@ninetynine/react-table" alt="npm total downloads">
    </a>
  </sup>
  <br />
  <br />
  <br />
  <br />
  <pre>npm i <a href="https://www.npmjs.com/package/react-table" target="_blank">react-table</a></pre>
  <br />
  <br />
  <br />
  <br />
  <br />
</div>

<br />
<br />

#### Basic Usage

##### `Table`

Use `Table` when data is not retrieved from an API endpoint. It's simple to get started:

```jsx
import React from 'react'
import Table from '@ninetynine/react-table'

const UsersTable = props => (
  <Table
    {...props}
    rows={[
      {
        id: 1,
        name: 'Leanne Graham'
      },
      {
        id: 2,
        name: 'Ervin Howell'
      }
    ]}
  />
)

export default UsersTable
```

Read more about customizing `Table`'s functionality [here](./docs/table.md).

##### `AjaxTable`

Use `AjaxTable` when data is being retrieved from an API endpoint. It is built on top of `Table` with a new minor tweaks:

```jsx
import React from 'react'
import { AjaxTable } from '@ninetynine/react-table'

const UsersTable = props => (
  <AjaxTable
    {...props}
    url='https://jsonplaceholder.typicode.com/users'
  />
)

export default UsersTable
```

Read more about customizing `AjaxTable`'s functionality [here](./docs/ajax-table.md).
