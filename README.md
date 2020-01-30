# node-fastest-json-read

Benchmark for fastest reading of json files


Here we compare fs.readFile with fs.redFileSync and require (without cache).

Currently result look like this on 1000 iterations:

```
require: 835.308ms
readFileSync: 666.151ms
readFileAsync: 1178.361ms
```

So it is clearly better to use readFileSync, if you don't need data cached and if you don't care about blocking
(for example when using tests or on application startup).
