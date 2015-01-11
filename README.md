# fluent

A lightweight library to create a fluent API

## Usage
```javascript
var config = {
  init: ['firstFn'],
  chain: {
    firstFn: {
      next: ['secondFn'],
      cb: function() { ... }
    },
    secondFn: {
      next: ['lastFn'],
      cb: function() { ... }
    },
    lastFn: {
      next: [],
      cb: function() { ... }
    }
  },
  done: function() { ... }
};
var fluent = new Fluent(config);
fluent.firstFn().secondFn().lastFn()();

```

