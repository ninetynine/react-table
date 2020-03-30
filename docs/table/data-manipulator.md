<div align="center">
  <pre>dataManipulator</pre>
</div>

<br />
<br />

The `dataManipulator` prop is used to manipulate field values before they are displayed. This expects a function.

_Default implementation:_
```jsx
<Table
  dataManipulator={({ value }) => (
    value !== null && value !== undefined
      ? value : '-'
  )}
/>
```
