<div align="center">
  <pre>fieldsToExclude</pre>
</div>

<br />
<br />

The `fieldsToExclude` prop should be an array of strings or [regular expressions][regexp] to blacklist fields.

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
  fieldsToExclude={[
    /_?name$/, 'email'
  ]}
/>

// --> Id, Phone
```

[regexp]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp
