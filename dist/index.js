"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "Table", {
  enumerable: true,
  get: function get() {
    return _table["default"];
  }
});
Object.defineProperty(exports, "PageLimit", {
  enumerable: true,
  get: function get() {
    return _helpers.PageLimit;
  }
});
Object.defineProperty(exports, "Pages", {
  enumerable: true,
  get: function get() {
    return _helpers.Pages;
  }
});
exports["default"] = void 0;

var _table = _interopRequireDefault(require("./table"));

var _helpers = require("./helpers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = _table["default"];
exports["default"] = _default;