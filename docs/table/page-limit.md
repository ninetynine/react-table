<div align="center">
  <pre>pageLimit</pre>
</div>

<br />
<br />

The `pageLimit` prop should be a function that accepts a single argument which is an object containing the [`onPageLimitChange`](./on-page-limit-change.md) prop.

You can use the built-in page limit control or create your own.

```jsx
import { useSetState } from 'react-use'

const [state, setState] = useSetState({
  limit = 5
})

<Table
  pageLimit={args => Table.pages({ value: limit, ...args })}
/>
```
