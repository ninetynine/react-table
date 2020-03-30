<div align="center">
  <pre>footer</pre>
</div>

<br />
<br />

The `footer` prop accepts a valid React element or function. When using a function it will recieve a single argument, which is an object containing: `rows` and `width`.

`width` is how wide the table is, useful when having a single cell with `colSpan`.

```jsx
<Table
  footer={({ rows, width }) => (
    <tr>
      <td colSpan={width}>
        Footer.
      </td>
    </tr>
  )}
  // footer={(
  //   <tr>
  //     <td>
  //       Footer.
  //     </td>
  //   </tr>
  // )}
/>
```
