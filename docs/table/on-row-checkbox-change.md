<div align="center">
  <pre>onRowCheckboxChange</pre>
</div>

<br />
<br />

The `onRowCheckboxChange` prop should be a function that accepts a single argument, which is the [row identifier](./row-identifier.md).

This should be used to toggle if a row's checkbox is checked or not by using the [`rowIsChecked`](./row-is-checked.md) prop.

```jsx
import { useSet } from 'react-use'

const [checked, { toggle }] = useSet()

<Table
  onRowCheckedChange={id => toggle(id)}
/>
```
