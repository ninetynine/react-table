<div align="center">
  <pre>rows</pre>
</div>

<br />
<br />

The `rows` prop accepts an array of objects. By default this will use the built in [`rowRenderer`](./row-renderer.md), [`rowIdentifier`](./row-identifier.md) and [`dataManipulator`](./data-manipulator.md) props.

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
/>

// --> Id, Name, Email, Phone
```
