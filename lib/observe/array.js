"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
var triggerChange = function triggerChange() {
	var _this = this;

	if (this._cb) {
		(function () {

			var result = [];
			_this.forEach(function (v) {
				return result.push(v);
			});
			_this._cb(result);
		})();
	}
};

var ObservableArray = function ObservableArray(array, cb) {

	Array.prototype.push.apply(this, array);
	this._cb = cb;
	return this;
};

ObservableArray.prototype = Object.create(Array.prototype);

['push', 'pop', 'shift', 'unshift', 'splice', 'splice', 'sort', 'reverse'].forEach(function (method) {

	ObservableArray.prototype[method] = function () {

		Array.prototype[method].apply(this, arguments);
		triggerChange.call(this);
	};
});

exports.default = ObservableArray;