// Minimal CommonJS mock for @angular/core used in unit tests
exports.Injectable = function (_opts) {
  return function (target) {
    return target;
  };
};

exports.Component = function (_opts) {
  return function (target) {
    return target;
  };
};

exports.NgModule = function (_opts) {
  return function (target) {
    return target;
  };
};

// Provide a no-op inject function for tests; tests will override component.service when needed.
exports.inject = function (_token) {
  return undefined;
};

// Decorator factories
exports.Output = function () {
  return function (target, prop) {
    // no-op decorator for tests
  };
};

exports.Input = function () {
  return function (target, prop) {
    // no-op decorator for tests
  };
};

// Minimal EventEmitter implementation for tests
exports.EventEmitter = class {
  constructor() {
    this._listeners = [];
  }
  emit(value) {
    this._listeners.forEach(fn => fn(value));
  }
  subscribe(fn) {
    this._listeners.push(fn);
    return { unsubscribe: () => { this._listeners = this._listeners.filter(f => f !== fn); } };
  }
};
