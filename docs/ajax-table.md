<div align="center">
  <pre>import { AjaxTable } from '<a href="https://www.npmjs.com/package/@ninetynine/react-table" target="_blank">@ninetyine/react-table</a>'</pre>
</div>

<br />
<br />

`AjaxTable` should be used when data is not retrieved from an API. The `AjaxTable` extends the base [`Table`](./table.md) so can use all of the same props, find out more [here](./table.md).

<br />
<br />

Props
  * [`url`](./ajax-table/url.md): The endpoint where dataset is fetched from
  * [`params`](./ajax-table/params.md): An object that defines params to be passed as a query string when retrieving the dataset
  * [`responseManipulator`](./ajax-table/response-manipulator.md): Manipulate the response to return the dataset
  * [`onLoad`](./ajax-table/on-load.md): A callback which is triggered after the dataset is retrieved
  * [`loadingRow`](./ajax-table/loading-row.md): A valid React element to be displayed while the dataset is being retrieved
