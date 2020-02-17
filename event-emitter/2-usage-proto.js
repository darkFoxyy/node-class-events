'use strict';

const EventEmitter = require('./1-proto.js');

const ee = new EventEmitter();

ee.on('event1', data => {
  console.dir(data);
});

ee.emit('event1', { a: 5 });