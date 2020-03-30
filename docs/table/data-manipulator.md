<div align="center">
  <pre>dataManipulator</pre>
</div>

<br />
<br />

The `dataManipulator` prop is used to manipulate field values before they are displayed. This expects a function that should return a valid React element.

_Default implementation:_
```jsx
<Table
  dataManipulator={({ value }) => {
    if (value === null || value === undefined) {
      return '-'
    }

    if (!React.isValidElement(value) && typeof value === 'object') {
      return <i>Hidden</i>
    }

    return value
  }}
/>
```
