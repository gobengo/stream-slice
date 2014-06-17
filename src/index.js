'use strict'

var transform = require('stream-transform');

/**
 * stream-slice
 * var cycle = require('stream-slice');
 * @param [start] {number} index to start at
 * @param stop {number} index to stop before
 * @example slice(3) // slice to length 3
 * @example slice(1, 2) // slice to only the second element
 */
module.exports = function (start, stop) {
    if (arguments.length === 1) {
        stop = start;
        start = 0;
    }
    var index = 0;
    return transform(function (x, done) {
        if (index >= stop) {
            // we're done for good, push null to end
            return done(null, null);
        }

        // we'll be continuing
        index++;

        if (index <= start) {
            // don't start yet, just increment and move along
            return done();
        }
        // in the wheelhouse, push it http://youtu.be/vCadcBR95oU
        return done(null, x);
    });
};
