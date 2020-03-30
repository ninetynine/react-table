<div align="center">
  <pre>actions</pre>
</div>

<br />
<br />

The `actions` prop is used to be appended on the end of each row when using the default implementation of the [`rowRenderer`](./row-renderer.md). This expects a function which gets a single argument being the row object and should return a valid React element.

```jsx
import { useSet } from 'react-use'

const [checked, { has, toggle }] = useSet()

<Table
  actions={id => (
    <a onClick={() => toggle(id)}>
      {has(id) ? 'Unflag' : 'Flag'}
    </a>
  )}
/>
```
