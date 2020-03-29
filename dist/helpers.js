"use strict";

require("core-js/modules/es.array.includes");

require("core-js/modules/es.array.map");

require("core-js/modules/es.string.includes");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Pages = exports.PageLimit = void 0;

var PageLimit = function PageLimit(_ref) {
  var value = _ref.value,
      onChange = _ref.onChange;
  return /*#__PURE__*/React.createElement("select", {
    className: "react-dynamic-table-page-limit",
    onChange: onChange,
    value: value
  }, /*#__PURE__*/React.createElement("option", {
    value: 5
  }, "5"), /*#__PURE__*/React.createElement("option", {
    value: 10
  }, "10"), /*#__PURE__*/React.createElement("option", {
    value: 15
  }, "15"), /*#__PURE__*/React.createElement("option", {
    value: 20
  }, "20"));
};

exports.PageLimit = PageLimit;

var Pages = function Pages(_ref2) {
  var value = _ref2.value,
      _ref2$total = _ref2.total,
      total = _ref2$total === void 0 ? 1 : _ref2$total,
      _ref2$delta = _ref2.delta,
      delta = _ref2$delta === void 0 ? 5 : _ref2$delta,
      onChange = _ref2.onChange;

  if (total <= 1) {
    return null;
  }

  var pages = [];

  for (var i = 1; i < total; i++) {
    var next = pages[pages.length - 1] + 1;

    if ([0, total].includes(i) || Math.abs(value - i) <= delta) {
      if (pages.length >= 1 && i !== next) {
        pages.push("pad-".concat(i));
      }

      pages.push(i);
    }
  }

  return /*#__PURE__*/React.createElement("div", {
    className: "react-dynamic-table-pages"
  }, /*#__PURE__*/React.createElement("a", {
    onClick: function onClick() {
      return onChange(value - 1);
    }
  }, "Previous"), pages.map(function (page) {
    var pad = "".concat(page).includes('pad');
    return /*#__PURE__*/React.createElement("a", {
      key: page,
      style: {
        cursor: !pad || 'not-allowed'
      },
      onClick: function onClick() {
        return pad || onChange(page);
      }
    }, !pad ? page : '...');
  }), /*#__PURE__*/React.createElement("a", {
    onClick: function onClick() {
      return onChange(value + 1);
    }
  }, "Next"));
};

exports.Pages = Pages;