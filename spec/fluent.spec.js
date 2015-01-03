'use strict';

describe('fluent', function() {

  var Fluent = require('../lib/fluent');

  describe('The method chain', function() {

    it('can create a simple function chain with a config object', function() {
      var config = {
        init: ['firstFn'],
        chain: {
          firstFn: ['secondFn'],
          secondFn: ['lastFn'],
          lastFn: []
        }
      };
      var fluent = new Fluent(config);
      expect(fluent.firstFn).toBeDefined();
      expect(fluent.firstFn().secondFn).toBeDefined();
      expect(fluent.firstFn().secondFn().lastFn).toBeDefined();

      expect(fluent.secondFn).not.toBeDefined();
      expect(fluent.lastFn).not.toBeDefined();

      expect(fluent.firstFn().firstFn).not.toBeDefined();
      expect(fluent.firstFn().lastFn).not.toBeDefined();

      expect(fluent.firstFn().secondFn().firstFn).not.toBeDefined();
      expect(fluent.firstFn().secondFn().secondFn).not.toBeDefined();
    });

  });

});
