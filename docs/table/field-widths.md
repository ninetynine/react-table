<div align="center">
  <pre>fieldWidths</pre>
</div>

<br />
<br />

The `fieldWidths` prop should be an object of attributes and integers. This allows table cell widths to be defined for each field.

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
  fieldWidths={{
    id: 20
  }}
/>
```
