"use strict";require("core-js/modules/es.symbol"),require("core-js/modules/es.symbol.description"),require("core-js/modules/es.symbol.iterator"),require("core-js/modules/es.array.concat"),require("core-js/modules/es.array.filter"),require("core-js/modules/es.array.for-each"),require("core-js/modules/es.array.from"),require("core-js/modules/es.array.index-of"),require("core-js/modules/es.array.is-array"),require("core-js/modules/es.array.iterator"),require("core-js/modules/es.array.join"),require("core-js/modules/es.array.map"),require("core-js/modules/es.array.slice"),require("core-js/modules/es.date.to-string"),require("core-js/modules/es.function.name"),require("core-js/modules/es.object.assign"),require("core-js/modules/es.object.define-properties"),require("core-js/modules/es.object.define-property"),require("core-js/modules/es.object.get-own-property-descriptor"),require("core-js/modules/es.object.get-own-property-descriptors"),require("core-js/modules/es.object.keys"),require("core-js/modules/es.object.to-string"),require("core-js/modules/es.promise"),require("core-js/modules/es.regexp.to-string"),require("core-js/modules/es.string.iterator"),require("core-js/modules/web.dom-collections.for-each"),require("core-js/modules/web.dom-collections.iterator"),Object.defineProperty(exports,"__esModule",{value:!0}),exports["default"]=void 0;var _react=_interopRequireDefault(require("react")),_propTypes=_interopRequireDefault(require("prop-types")),_reactUse=require("react-use"),_helpers=require("./helpers"),_table=_interopRequireDefault(require("./table"));function _interopRequireDefault(a){return a&&a.__esModule?a:{default:a}}function ownKeys(a,b){var c=Object.keys(a);if(Object.getOwnPropertySymbols){var d=Object.getOwnPropertySymbols(a);b&&(d=d.filter(function(b){return Object.getOwnPropertyDescriptor(a,b).enumerable})),c.push.apply(c,d)}return c}function _objectSpread(a){for(var b,c=1;c<arguments.length;c++)b=null==arguments[c]?{}:arguments[c],c%2?ownKeys(Object(b),!0).forEach(function(c){_defineProperty(a,c,b[c])}):Object.getOwnPropertyDescriptors?Object.defineProperties(a,Object.getOwnPropertyDescriptors(b)):ownKeys(Object(b)).forEach(function(c){Object.defineProperty(a,c,Object.getOwnPropertyDescriptor(b,c))});return a}function _defineProperty(a,b,c){return b in a?Object.defineProperty(a,b,{value:c,enumerable:!0,configurable:!0,writable:!0}):a[b]=c,a}function _extends(){return _extends=Object.assign||function(a){for(var b,c=1;c<arguments.length;c++)for(var d in b=arguments[c],b)Object.prototype.hasOwnProperty.call(b,d)&&(a[d]=b[d]);return a},_extends.apply(this,arguments)}function _slicedToArray(a,b){return _arrayWithHoles(a)||_iterableToArrayLimit(a,b)||_unsupportedIterableToArray(a,b)||_nonIterableRest()}function _nonIterableRest(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function _unsupportedIterableToArray(a,b){if(a){if("string"==typeof a)return _arrayLikeToArray(a,b);var c=Object.prototype.toString.call(a).slice(8,-1);return"Object"===c&&a.constructor&&(c=a.constructor.name),"Map"===c||"Set"===c?Array.from(c):"Arguments"===c||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(c)?_arrayLikeToArray(a,b):void 0}}function _arrayLikeToArray(a,b){(null==b||b>a.length)&&(b=a.length);for(var c=0,d=Array(b);c<b;c++)d[c]=a[c];return d}function _iterableToArrayLimit(a,b){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(a)){var c=[],d=!0,e=!1,f=void 0;try{for(var g,h=a[Symbol.iterator]();!(d=(g=h.next()).done)&&(c.push(g.value),!(b&&c.length===b));d=!0);}catch(a){e=!0,f=a}finally{try{d||null==h["return"]||h["return"]()}finally{if(e)throw f}}return c}}function _arrayWithHoles(a){if(Array.isArray(a))return a}function _objectWithoutProperties(a,b){if(null==a)return{};var c,d,e=_objectWithoutPropertiesLoose(a,b);if(Object.getOwnPropertySymbols){var f=Object.getOwnPropertySymbols(a);for(d=0;d<f.length;d++)c=f[d],!(0<=b.indexOf(c))&&Object.prototype.propertyIsEnumerable.call(a,c)&&(e[c]=a[c])}return e}function _objectWithoutPropertiesLoose(a,b){if(null==a)return{};var c,d,e={},f=Object.keys(a);for(d=0;d<f.length;d++)c=f[d],0<=b.indexOf(c)||(e[c]=a[c]);return e}var AjaxTable=function(a){var b=a.url,c=a.params,d=a.responseManipulator,e=a.onLoad,f=a.rows,g=a.loadingRow,h=a.emptyRow,i=_objectWithoutProperties(a,["url","params","responseManipulator","onLoad","rows","loadingRow","emptyRow"]),j=(0,_reactUse.useSetState)({loading:!0,rows:f}),k=_slicedToArray(j,2),l=k[0],m=k[1],n=encodeURIComponent,o=Object.keys(c).map(function(a){return"".concat(n(a),"=").concat(n(c[a]))}).join("&"),p="".concat(b,"?").concat(o),q=function(){return fetch(p,{credentials:"include"}).then(function(a){return a.json()}).then(function(a){return d(a)}).then(function(a){m({loading:!1,rows:a}),e(a)})};return(0,_reactUse.useMount)(function(){q()}),(0,_reactUse.useUpdateEffect)(function(){m({loading:!0}),q()},[b,c]),(0,_reactUse.useUpdateEffect)(function(){m({rows:f})},[f]),_react["default"].createElement(_table["default"],_extends({},i,{rows:l.loading?[]:l.rows,emptyRow:l.loading?g:h}))};AjaxTable.defaultProps=_objectSpread({params:{},rows:[],loadingRow:_react["default"].createElement("tr",null,_react["default"].createElement("td",null,"Loading...")),responseManipulator:function responseManipulator(a){return a},onLoad:_helpers.NOOP},_table["default"].defaultProps),AjaxTable.propTypes=_objectSpread({url:_propTypes["default"].string.isRequired,params:_propTypes["default"].object,responseManipulator:_propTypes["default"].func,onLoad:_propTypes["default"].func,loadingRow:_propTypes["default"].node},_table["default"].propTypes);var _default=AjaxTable;exports["default"]=_default;