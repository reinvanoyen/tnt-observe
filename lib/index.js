"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ObservableObject = exports.ObservableArray = undefined;

var _array = require('./observe/array');

var _array2 = _interopRequireDefault(_array);

var _object = require('./observe/object');

var _object2 = _interopRequireDefault(_object);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.ObservableArray = _array2.default;
exports.ObservableObject = _object2.default;