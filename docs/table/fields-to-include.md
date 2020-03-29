<div align="center">
  <pre>fieldsToInclude</pre>
</div>

<br />
<br />

The `fieldsToInclude` prop should be an array of strings or [regular expressions][regexp] to whitelist fields.

```jsx
<Table
  rows={[
    {
      id: 1,
      full_name: 'Leanne Graham',
      email: 'leanne@example.com',
      phone: '012345678910'
    },
    {
      id: 2,
      full_name: 'Ervin Howell',
      email: 'ervin@example.com',
      phone: '019876543210'
    }
  ]}
  fieldsToInclude={[
    /_?name$/, 'email'
  ]}
/>

// --> Full Name, Email
```

[regexp]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp
