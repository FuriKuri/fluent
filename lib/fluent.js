'use strict';

function createSubFunctions(obj, functionNames, getNextFunctions, getCallback) {
  functionNames.forEach(function(name) {
    var returnObject = {};
    createSubFunctions(returnObject, getNextFunctions(name), getNextFunctions, getCallback);
    obj[name] = function() {
      var callback = getCallback(name);
      if (callback) {
        callback();
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
    createSubFunctions(this, config.init, createNextFunctions(config), createRequestCallbackFunction(config));
  }

  return Fluent;
})();
