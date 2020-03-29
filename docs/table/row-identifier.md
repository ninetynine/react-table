<div align="center">
  <pre>rowIdentifier</pre>
</div>

<br />
<br />

The `rowIdentifier` prop should be a function that accepts a single argument, which is the current row object, it should return a unique identifier that will be used throughout the ecosystem.

For example it is used with [`rowIsChecked`](./row-is-checked.md) to determine if a row's checkbox is checked.

```jsx
<Table
  rowIdentifier={({ id }) => id}
/>
```
