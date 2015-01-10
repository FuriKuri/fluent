'use strict';

function createSubFunctions(obj, functionNames, getNextFunctions, getCallback, doneCallback) {
  functionNames.forEach(function(name) {
    var returnObject = function() {
      doneCallback.apply(this, arguments);
    };
    createSubFunctions(returnObject, getNextFunctions(name), getNextFunctions, getCallback, doneCallback);
    obj[name] = function() {
      var callback = getCallback(name);
      if (callback) {
        callback.apply(this, arguments);
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
    createSubFunctions(this, config.init, createNextFunctions(config), createRequestCallbackFunction(config), config.done);
  }

  return Fluent;
})();
