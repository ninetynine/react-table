<div align="center">
  <pre>onMasterToggle</pre>
</div>

<br />
<br />

When wanting to use a master checkbox this is one of two requirements. The other is the [`masterIsChecked`](./master-is-checked.md) prop.

The `onMasterToggle` prop should be a function. That controls a _master_ checkbox that is displayed in the table header.

This should be used to toggle multiple row checkboxes. To determine if this checkbox is checked or not use [`masterIsChecked`](./master-is-checked.md).

```jsx
import { useSetState, useSet } from 'react-use'

const [state, setState] = useSetState({ rows: [] })
const [checked, { has, add }] = useSet()

<Table
  onMasterToggle={() => {
    state.rows.forEach(row => {
      if (!has(row.id)) {
        add(row.id)
      }
    })
  }}
/>
```

