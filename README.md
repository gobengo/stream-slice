# stream-slice

<img style="max-width: 300px" src="http://upload.wikimedia.org/wikipedia/commons/4/4c/Eierschneider.jpg" />

Create a [stream](https://github.com/Livefyre/stream)/Transform that slices a stream piped into it. For example, take an infinite [stream-cycle](https://github.com/gobengo/stream-cycle) and limit it to N objects.

A lot like Python's [itertools.islice](https://docs.python.org/2/library/itertools.html#itertools.islice)

## Example

```javascript
var cycle = require('stream-cycle');
var slice = require('stream-slice');

var infinite = cycle([1,0]);
var only5 = infinite.pipe(slice(100));
only5
  .on('end', function () {
    console.log('ended after 5');
  })
  .on('data', console.log);

// 1
// 0
// 1
// 0
// 1
// ended after 5
```

## `make` commands

* `make build` - will `npm install` and `bower install`
* `make dist` - will use r.js optimizer to compile the source, UMD wrap, and place that and source maps in dist/
* `make clean`
* `make server` - serve the repo over http
* `make deploy [env={*prod,uat,qa}]` - Deploy to lfcdn, optionally specifying a bucket env
