<div align="center">
  <pre>fieldMap</pre>
</div>

<br />
<br />

The `fieldMap` prop should be an object of attributes and strings.

By default a field will be titlecased if no map exists for it. Such as `user_id` becomes `User Id`, the behaviour can be overridden by providing a field map.

```jsx
<Table
  rows={[
    {
      id: 1,
      name: 'Leanne Graham',
    },
    {
      id: 2,
      name: 'Ervin Howell',
    }
  ]}
  fieldMap={{
    name: 'Full Name'
  }}
/>

// --> Id, Full Name
```
