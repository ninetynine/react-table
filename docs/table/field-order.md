<div align="center">
  <pre>fieldOrder</pre>
</div>

<br />
<br />

The `fieldOrder` prop should be an array of [regular expressions][regexp] or strings.

By default fields are displayed in the order which they are passed in as. This can be overridden by providing a field order.
Fields that are matched will be placed at the index which they are in the order, otherwise they are appended to the end.

_Basic example using strings:_
```jsx
<Table
  rows={[
    {
      id: 1,
      name: 'Leanne Graham',
      email: 'leanne@example.com',
      phone: '012345678910'
    },
    {
      id: 2,
      name: 'Ervin Howell',
      email: 'ervin@example.com',
      phone: '019876543210'
    }
  ]}
  fieldOrder={[
    'name', 'email'
  ]}
/>

// --> Name, Email, Id, Phone
```

Ordering fields also accept [regular expressions][regexp]. Each result matching a regular expression will be placed in the other they are found at the index of the order.

_Advanced example using regular expressions:_
```jsx
<Table
  rows={[
    {
      id: 1,
      name: 'Leanne Graham',
      company_id: 1,
      details_id: 1
    },
    {
      id: 2,
      name: 'Ervin Howell',
      company_id: 1,
      details_id: 2
    }
  ]}
  fieldOrder={[
    /_?id$/
  ]}
/>

// --> Id, Company Id, Details Id, Name
```

[regexp]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp
