<div align="center">
  <pre>onPageLimitChange</pre>
</div>

<br />
<br />

The `onPageLimitChange` prop should be a function that accepts a single argument, which is a change event by default when using the built-in helper [`PageLimit`](./page-limit.md).

```jsx
import { useSetState } from 'react-use'

const [state, setState] = useSetState({
  limit = 5
})

<Table
  onPageLimitChange={({ event }) => {
    setState({
      limit: target.value
    })
  }}
/>
```
