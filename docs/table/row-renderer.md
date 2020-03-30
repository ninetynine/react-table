<div align="center">
  <pre>rowRenderer</pre>
</div>

<br />
<br />

The `rowRenderer` prop is expected to be a function that recieves an object with: `key`, `row`, [`fields`](#fields), [`dataManipulator`](./data-manipulator.md), [`actions`](./actions.md), [`isChecked`](#ischecked), [`onClick`](#onclick), [`onToggle`](#ontoggle) attributes and returns a valid React element (hopefully a `tr`!).

Each of these attributes are named to make it easy to understand which each one does.

* `key`: Use this as the `key` prop on the `tr`
* `row`: The current row's data
* [`fields`](#fields): The fields to be displayed
* [`dataManipulator`](./data-manipulator.md): A function which should wrap any values
* [`actions`](./actions.md): A node to display row actions
* [`isChecked`](#ischecked): Use this as the `checked` prop on the row's checkbox
* [`onClick`](#onclick): Use this as the `onClick` prop on the `tr`
* [`onToggle`](#ontoggle): Use this as the `onChange` prop on the row's checkbox

_Default implementation:_
```jsx
<Table
  rowRenderer={({ key, row, fields, dataManipulator, actions, isChecked, onClick, onToggle }) => (
    <tr
      key={key}
      onClick={onClick}
    >
      {onToggle && (
        <td>
          <input
            type='checkbox'
            checked={isChecked}
            onChange={onToggle}
          />
        </td>
      )}
      {fields.map(field => (
        <td key={field}>
          {dataManipulator({
            field, value: row[field], row
          })}
        </td>
      ))}
      {actions}
    </tr>
  )}
/>
```

##### `fields`

`fields` is an array of strings, in the correct order based on the [`fieldOrder`](./field-order.md) prop, to be displayed filtered by the [`fieldsToExclude`](./fields-to-exclude.md) and [`fieldsToInclude`](./fields-to-include.md) props.

##### `isChecked`

`isChecked` is an alias for the result from [`rowIsChecked`](./row-is-checked.md).

##### `onClick`

`onClick` is an alias for [`onRowClick`](./on-row-click.md).

##### `onToggle`

`onToggle` is an alias for [`onRowCheckboxChange`](./on-row-checkbox-change.md).
