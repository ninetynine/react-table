<div align="center">
  <pre>import { Table } from '<a href="https://www.npmjs.com/package/@ninetynine/react-table" target="_blank">@ninetyine/react-table</a>'</pre>
</div>

<br />
<br />

`Table` should be used when data is not retrieved from an API endpoint.
It is also the basis for all other table components, such as [`AjaxTable`](/docs/ajax-table.md) which is built on top of this.

By default the table container has the class of `react-dynamic-table`.

<br />
<br />

Props
* [`rows`](./table/rows.md): Data to be rendered
  * [`rowRenderer`](./table/row-renderer.md): How a row is rendered
  * [`rowIdentifier`](./table/row-identifier.md): A unique identifier for a row
  * [`emptyRow`](./table/empty-row.md): What is displayed when the dataset is empty
  * [`dataManipulator`](./table/data-manipulator.md): Manipulate field values before displaying them
* Fields
  * [`fieldMap`](./table/field-map.md): Map fields to be displayed as headers
  * [`fieldOrder`](./table/field-order.md): Define the order in which fields are displayed
  * [`fieldWidths`](./table/field-widths.md): Define the width for each field
  * [`fieldsToExclude`](./table/fields-to-exclude.md): Blacklist fields to display
  * [`fieldsToInclude`](./table/fields-to-include.md): Whitelist fields to display
* Extras
  * [`header`](./table/header.md): Define if field headers should be displayed
  * [`footer`](./table/footer.md): Define a table footer
  * [`actions`](./table/actions.md): Define actions to be displayed at the end of each row
  * Page Limit
    * [`pageLimit`](./table/page-limit.md): Define a page limit control to be displayed
    * [`onPageLimitChange`](./table/on-page-limit-change.md): Define a page limit change callback
  * Pages
    * [`pages`](./table/pages.md): Define a pagination pages control to be displayed
    * [`onPageChange`](./table/on-page-change.md): Define a page change callback
  * Checkboxes
    * [`rowIsChecked`](./table/row-is-checked.md): Define a callback to determine if a row checkbox is checked
    * [`masterIsChecked`](./table/master-is-checked.md): Define a callback to determine if the master checkbox is checked
    * [`onRowToggle`](./table/on-row-toggle.md): Define a row checkbox change callback
    * [`onMasterToggle`](./table/on-master-toggle.md):
    Define a master checkbox change callback
