<div align="center">
  <pre>url</pre>
</div>

<br />
<br />

The `url` prop expects a string, to be a valid URI which then is used to retrieve the dataset via a `GET` request. To pass query parameters when making the request use the [`params`](./params.md) prop.

```jsx
<AjaxTable
  url='https://jsonplaceholder.typicode.com/users'
/>
```
