"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.concat");

require("core-js/modules/es.array.filter");

require("core-js/modules/es.array.find-index");

require("core-js/modules/es.array.from");

require("core-js/modules/es.array.index-of");

require("core-js/modules/es.array.is-array");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.array.map");

require("core-js/modules/es.array.slice");

require("core-js/modules/es.array.splice");

require("core-js/modules/es.date.to-string");

require("core-js/modules/es.function.name");

require("core-js/modules/es.object.assign");

require("core-js/modules/es.object.keys");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.regexp.constructor");

require("core-js/modules/es.regexp.exec");

require("core-js/modules/es.regexp.to-string");

require("core-js/modules/es.string.iterator");

require("core-js/modules/es.string.replace");

require("core-js/modules/web.dom-collections.iterator");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactUse = require("react-use");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _helpers = require("./helpers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var NOOP = function NOOP() {
  return null;
};

var Table = function Table(_ref) {
  var rows = _ref.rows,
      rowRenderer = _ref.rowRenderer,
      rowIdentifier = _ref.rowIdentifier,
      emptyRow = _ref.emptyRow,
      dataManipulator = _ref.dataManipulator,
      fieldMap = _ref.fieldMap,
      fieldOrder = _ref.fieldOrder,
      fieldsToExclude = _ref.fieldsToExclude,
      fieldsToInclude = _ref.fieldsToInclude,
      header = _ref.header,
      footer = _ref.footer,
      pageLimit = _ref.pageLimit,
      pages = _ref.pages,
      actions = _ref.actions,
      onRowClick = _ref.onRowClick,
      onPageLimitChange = _ref.onPageLimitChange,
      onPageChange = _ref.onPageChange,
      className = _ref.className,
      rest = _objectWithoutProperties(_ref, ["rows", "rowRenderer", "rowIdentifier", "emptyRow", "dataManipulator", "fieldMap", "fieldOrder", "fieldsToExclude", "fieldsToInclude", "header", "footer", "pageLimit", "pages", "actions", "onRowClick", "onPageLimitChange", "onPageChange", "className"]);

  var _useSetState = (0, _reactUse.useSetState)({
    fields: []
  }),
      _useSetState2 = _slicedToArray(_useSetState, 2),
      state = _useSetState2[0],
      setState = _useSetState2[1]; // Return fields


  var $fields = function $fields() {
    if (!rows.length) {
      return [];
    }

    var row = rows[0];
    var fields = Object.keys(row); // Fields to exclude

    var regexFieldsToExclude = fieldsToExclude.filter(function (e) {
      return typeof e !== 'string';
    });
    var stringFieldsToExclude = fieldsToExclude.filter(function (e) {
      return typeof e === 'string';
    }); // Fields to include

    var regexFieldsToInclude = fieldsToInclude.filter(function (e) {
      return typeof e !== 'string';
    });
    var stringFieldsToInclude = fieldsToInclude.filter(function (e) {
      return typeof e === 'string';
    });

    for (var i = 0; i < fields.length; i++) {
      var field = fields[i]; // Check for string exclusions

      if (stringFieldsToExclude.length && stringFieldsToExclude.indexOf(field) > -1) {
        fields.splice(i, 1, null);
        continue;
      } // Check for regex exclusions


      if (regexFieldsToExclude.length) {
        var found = false;

        for (var r = 0; r < regexFieldsToExclude.length; r++) {
          if (regexFieldsToExclude[r].test(field)) {
            fields.splice(i, 1, null);
            found = true;
            break;
          }
        }

        if (found) {
          continue;
        }
      } // Check for string inclusions


      if (stringFieldsToInclude.length && stringFieldsToInclude.indexOf(field) < 0) {
        fields.splice(i, 1, null);
        continue;
      } // Check for regex inclusions


      if (regexFieldsToInclude.length) {
        var _found = false;

        for (var _r = 0; _r < regexFieldsToInclude.length; _r++) {
          if (!regexFieldsToInclude[_r].test(field)) {
            fields.splice(i, 1, null);
            _found = true;
            break;
          }
        }

        if (_found) {
          continue;
        }
      }
    }

    fields = fields.filter(function (e) {
      return e;
    });
    var ordered = [];

    var _loop = function _loop(_i2) {
      var field = fields[_i2];
      var index = fieldOrder.findIndex(function (order) {
        return typeof order !== 'string' ? order.test(field) : order === field;
      });

      if (index > -1) {
        ordered.splice(index, 0, field);
      } else {
        ordered.push(field);
      }
    };

    for (var _i2 = 0; _i2 < fields.length; _i2++) {
      _loop(_i2);
    }

    return ordered;
  }; // Return headers


  var $headers = function $headers() {
    return state.fields.map(function (field) {
      return (// Field field is mapped then use the new name
        // Otherwise attempt to make it friendly to read
        fieldMap[field] ? fieldMap[field] : field.replace(/([A-Z])([A-Z])/g, function (_, a, b) {
          return "".concat(a, " ").concat(b);
        }).toLowerCase().replace(/([ -_]|^)(.)/g, function (_, a, b) {
          return "".concat(a ? ' ' : '', " ").concat(b.toUpperCase());
        })
      );
    });
  }; // Only get fields once mounted


  (0, _reactUse.useMount)(function () {
    setState({
      fields: $fields()
    });
  });
  return /*#__PURE__*/_react["default"].createElement("div", _extends({}, rest, {
    className: (0, _classnames["default"])([className, 'react-dynamic-table'])
  }), /*#__PURE__*/_react["default"].createElement("table", null, header && /*#__PURE__*/_react["default"].createElement("thead", null, /*#__PURE__*/_react["default"].createElement("tr", null, $headers().map(function (header) {
    return /*#__PURE__*/_react["default"].createElement("th", {
      key: header
    }, header);
  }), !!actions && /*#__PURE__*/_react["default"].createElement("th", null))), /*#__PURE__*/_react["default"].createElement("tbody", null, !rows.length && emptyRow, !!rows.length && rows.map(function (row) {
    return rowRenderer({
      row: row,
      rowIdentifier: rowIdentifier,
      fields: state.fields,
      dataManipulator: dataManipulator,
      actions: actions,
      onClick: onRowClick !== NOOP ? onRowClick : undefined
    });
  })), (footer !== NOOP || pageLimit !== NOOP) && /*#__PURE__*/_react["default"].createElement("tfoot", null, typeof footer === 'function' && footer({
    rows: rows,
    width: state.fields.length + (actions ? 1 : 0)
  }), typeof footer !== 'function' && footer, (pageLimit !== NOOP || pages !== NOOP) && /*#__PURE__*/_react["default"].createElement("tr", null, /*#__PURE__*/_react["default"].createElement("td", null, typeof pageLimit === 'function' && pageLimit({
    onChange: onPageLimitChange
  }), typeof pageLimit !== 'function' && pageLimit), /*#__PURE__*/_react["default"].createElement("td", null, typeof pages === 'function' && pages({
    onChange: onPageChange
  }), typeof pages !== 'function' && pages)))));
};

Table.pageLimit = _helpers.PageLimit;
Table.pages = _helpers.Pages;
Table.defaultProps = {
  rows: [],
  rowIdentifier: function rowIdentifier(row) {
    return row.id;
  },
  rowRenderer: function rowRenderer(_ref2) {
    var row = _ref2.row,
        rowIdentifier = _ref2.rowIdentifier,
        fields = _ref2.fields,
        dataManipulator = _ref2.dataManipulator,
        actions = _ref2.actions,
        onClick = _ref2.onClick;
    return /*#__PURE__*/_react["default"].createElement("tr", {
      key: rowIdentifier(row),
      onClick: onClick
    }, fields.map(function (field) {
      return /*#__PURE__*/_react["default"].createElement("td", {
        key: field
      }, dataManipulator({
        field: field,
        value: row[field],
        row: row
      }));
    }), actions);
  },
  emptyRow: /*#__PURE__*/_react["default"].createElement("tr", null, /*#__PURE__*/_react["default"].createElement("td", null, "There's nothing here.")),
  dataManipulator: function dataManipulator(_ref3) {
    var value = _ref3.value;
    return value !== null && value !== undefined ? value : '-';
  },
  //
  fieldMap: {},
  fieldOrder: [],
  fieldsToExclude: [],
  fieldsToInclude: [],
  //
  header: true,
  footer: NOOP,
  pageLimit: NOOP,
  pages: NOOP,
  actions: null,
  //
  onRowClick: NOOP,
  onPageLimitChange: NOOP,
  onPageChange: NOOP
};
Table.propTypes = {
  rows: _propTypes["default"].arrayOf(_propTypes["default"].object),
  rowIdentifier: _propTypes["default"].func,
  rowRenderer: _propTypes["default"].func,
  emptyRow: _propTypes["default"].node,
  dataManipulator: _propTypes["default"].func,
  //
  fieldMap: _propTypes["default"].object,
  fieldOrder: _propTypes["default"].arrayOf(_propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].instanceOf(RegExp)])),
  fieldsToExclude: _propTypes["default"].arrayOf(_propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].instanceOf(RegExp)])),
  fieldsToInclude: _propTypes["default"].arrayOf(_propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].instanceOf(RegExp)])),
  //
  header: _propTypes["default"].bool,
  footer: _propTypes["default"].oneOfType([_propTypes["default"].node, _propTypes["default"].func]),
  pageLimit: _propTypes["default"].oneOfType([_propTypes["default"].node, _propTypes["default"].func]),
  pages: _propTypes["default"].oneOfType([_propTypes["default"].node, _propTypes["default"].func]),
  actions: _propTypes["default"].node,
  //
  onRowClick: _propTypes["default"].func,
  onPageLimitChange: _propTypes["default"].func,
  onPageChange: _propTypes["default"].func
};
var _default = Table;
exports["default"] = _default;