'use strict';

function createSubFunctions(obj, functionNames, getNextFunctions) {
  functionNames.forEach(function(name) {
    var returnObject = {};
    createSubFunctions(returnObject, getNextFunctions(name), getNextFunctions);
    obj[name] = function() {
      return returnObject;
    }
  });
}

function createNextFunctions(config) {
  return function(name) {
    return config.chain[name];
  }
}

module.exports = (function() {
  function Fluent(config) {
    createSubFunctions(this, config.init, createNextFunctions(config));
  }

  return Fluent;
})();
