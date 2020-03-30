<div align="center">
  <pre>onPageChange</pre>
</div>

<br />
<br />

The `onPageChange` prop should be a function that accepts a single argument, which is the new page by default when using the built-in helper [`Pages`](./pages.md).

```jsx
import { useSetState } from 'react-use'

const [state, setState] = useSetState({
  page = 5
})

<Table
  onPageChange={page => {
    setState({
      page
    })
  }}
/>
```
