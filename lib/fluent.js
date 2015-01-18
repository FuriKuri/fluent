'use strict';

function createSubFunctions(config, functions) {
  functions.forEach(function(name) {
    var returnObject = function() {
      if (arguments.length === 0) {
        config.doneFn.call(this, config.data);
      } else {
        config.doneFn.apply(this, arguments);
      }
    };
    createSubFunctions.bind(returnObject)(config, config.nextFn(name));
    this[name] = function() {
      var callback = config.callbackFn(name);
      if (callback) {
        callback.apply(this, arguments);
      } else {
        config.data[name] = arguments[0];
      }
      return returnObject;
    };
  }.bind(this));
}

function createNextFunctions(config) {
  return function(name) {
    return config.chain[name].next;
  };
}

function createRequestCallbackFunction(config) {
  return function(name) {
    return config.chain[name].cb;
  };
}

module.exports = (function() {
  function Fluent(config) {
    var data = {};
    createSubFunctions.bind(this)({
      functions: config.init,
      nextFn: createNextFunctions(config),
      callbackFn: createRequestCallbackFunction(config),
      doneFn: config.done,
      data: data}, config.init);
  }

  return Fluent;
})();
