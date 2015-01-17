'use strict';

function createSubFunctions(obj, functionNames, getNextFunctions, getCallback, doneCallback, data) {
  functionNames.forEach(function(name) {
    var returnObject = function() {
      if (arguments.length === 0) {
        doneCallback.call(this, data);
      } else {
        doneCallback.apply(this, arguments);
      }
    };
    createSubFunctions(returnObject, getNextFunctions(name), getNextFunctions, getCallback, doneCallback, data);
    obj[name] = function() {
      var callback = getCallback(name);
      if (callback) {
        callback.apply(this, arguments);
      } else {
        data[name] = arguments[0];
      }
      return returnObject;
    };
  });
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
    createSubFunctions(this, config.init, createNextFunctions(config), createRequestCallbackFunction(config), config.done, data);
  }

  return Fluent;
})();
