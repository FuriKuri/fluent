'use strict';

describe('fluent', function() {

  var Fluent = require('../lib/fluent');

  describe('The method chain', function() {

    it('can create a simple function chain with a config object', function() {
      var config = {
        init: ['firstFn'],
        chain: {
          firstFn: {
            next: ['secondFn']
          },
          secondFn: {
            next: ['lastFn']
          },
          lastFn: {
            next: []
          }
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

    it('has callbacks for each state', function() {
      var counter = 0;
      var cb = function() {
        counter++;
      };
      var config = {
        init: ['firstFn'],
        chain: {
          firstFn: {
            next: ['secondFn'],
            cb: cb
          },
          secondFn: {
            next: ['lastFn'],
            cb: cb
          },
          lastFn: {
            next: [],
            cb: cb
          }
        }
      };
      var fluent = new Fluent(config);
      fluent.firstFn().secondFn().lastFn();
      expect(counter).toEqual(3);
    });

    it('calls the done callback if chain is done', function() {
      var doneCallbackWasCalled = false;
      var config = {
        init: ['firstFn'],
        chain: {
          firstFn: {
            next: ['lastFn']
          },
          lastFn: {
            next: []
          }
        },
        done: function() {
          doneCallbackWasCalled = true;
        }
      };
      var fluent = new Fluent(config);

      fluent.firstFn().lastFn()();
      expect(doneCallbackWasCalled).toEqual(true);

    });
  });

});
