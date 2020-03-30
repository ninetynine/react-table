<div align="center">
  <pre>masterIsChecked</pre>
</div>

<br />
<br />

When wanting to use a master checkbox this is one of two requirements. The other is the [`onMasterCheckboxChange`](./on-master-checkbox-change.md) prop.

The `masterIsChecked` prop is used to determine if the master checkbox is checked or not. This expects a function that returns a bool.

```jsx
import { useSetState, useSet } from 'react-use'

const [state, setState] = useSetState({ rows: [] })
const [checked, { has }] = useSet()

<Table
  masterIsChecked={() => {
    let bool = true

    state.rows.forEach(row => {
      if (!has(row.id)) {
        bool = false
      }
    })

    return bool
  }}
/>
```
