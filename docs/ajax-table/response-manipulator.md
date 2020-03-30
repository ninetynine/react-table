<div align="center">
  <pre>responseManipulator</pre>
</div>

<br />
<br />

The `responseManipulator` prop expects a function, that gets a single argument which is the response body from the [dataset request](./url.md).

This should return an array which is then used as the dataset.

_Default implementation:_
```jsx
<AjaxTable
  responseManipulator={response => response}
/>
```
