<div align="center">
  <pre>pages</pre>
</div>

<br />
<br />

The `pages` prop should be a function that accepts a single argument which is an object containing the [`onPageChange`](./on-page-change.md) prop.

You can use the built-in pages control or create your own.

```jsx
import { useSetState } from 'react-use'

const [state, setState] = useSetState({
  page = 1, total = 10
})

<Table
  pages={args => Table.pages({ value: page, total, ...args })}
/>
```

You can also customize the page button delta by passing an integer with the attribute name "delta".
