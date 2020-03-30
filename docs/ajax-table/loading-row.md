<div align="center">
  <pre>loadingRow</pre>
</div>

<br />
<br />

The `loadingRow` prop expects a valid React element. This gets displayed while the dataset is being retrieved.

_Default implementation:_
```jsx
<AjaxTable
  loadingRow={(
    <tr>
      <td>Loading...</td>
    </tr>
  )}
/>
```
