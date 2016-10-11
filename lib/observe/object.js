"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _array = require("./array");

var _array2 = _interopRequireDefault(_array);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ObservableObject = function ObservableObject(o, cb) {

	var copy = {};

	var processNewValue = function processNewValue(v, prop) {
		if (v.constructor === Array) {
			return observeArray(v, prop);
		}
		return v;
	};

	var observeArray = function observeArray(a, prop) {
		return new _array2.default(a, function (result) {
			copy[prop] = result;
			cb(copy);
		});
	};

	for (var prop in o) {
		copy[prop] = o[prop];
		o[prop] = processNewValue(o[prop], prop);
	}

	var handler = {
		set: function set(original, k, v) {
			original[k] = processNewValue(v, k);
			copy[k] = v;
			cb(copy);
			return true;
		},
		deleteProperty: function deleteProperty(original, k) {
			delete original[k];
			delete copy[k];
			cb(copy);
			return true;
		}
	};

	return new Proxy(o, handler);
};

exports.default = ObservableObject;