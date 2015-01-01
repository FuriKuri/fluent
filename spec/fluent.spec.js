'use strict';

describe('fluent', function() {

  var fluent;
  beforeEach(function() {
    fluent = require('../lib/fluent');
  });

  describe('Your first test', function() {

    it('does something meaningful', function() {
      expect(fluent.prop1).toEqual('prop1');
    });

  });

});
