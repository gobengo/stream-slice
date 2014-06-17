"use strict";

var slice = require('stream-slice');
var ReadableArray = require('stream-arrays').ReadableArray;
var assert = require('chai').assert;
var sinon = require('sinon');

describe('stream-slice', function () {
  it('slices stream to length if one arg provided', function (done) {
    var things = [1,2,3,4,'7',{},6];
    var thingsStream = new ReadableArray(things);
    var slicedThingsStream = thingsStream.pipe(slice(3));
    var slicedThings = sliceArray.call(things, 3);
    assertStreams(slicedThingsStream, slicedThings, done);
  });

  it('slices stream to start, stop if two args provided', function (done) {
    var things = [1,2,3,4,'7',{},6];
    var thingsStream = new ReadableArray(things);
    var slicedThingsStream = thingsStream.pipe(slice(3,5));
    var slicedThings = sliceArray.call(things, 3, 5);
    assertStreams(slicedThingsStream, slicedThings, done);
  });
});

/**
 * Slice this array
 */
function sliceArray(start, stop) {
  switch (arguments.length) {
    case 1:
      // just the stop
      stop = start
      start = 0;
      break;
  }
  return this.filter(function (thing, index) {
    return start <= index && index < stop;
  });
}

/**
 * Assert that the provided {readable} streams the provided array
 * Read from the readable {readsToTest} times.
 * Then call {done}
 */
function assertStreams(readable, thingsToCycle, done) {
  var readsTested = 0;
  readable.on('readable', function testOnReadable() {
    var thing = readable.read();
    assert.equal(thing, thingsToCycle[readsTested]);
    readsTested++;
  });
  readable.on('error', done);
  readable.on('end', done.bind({}, null));
}
