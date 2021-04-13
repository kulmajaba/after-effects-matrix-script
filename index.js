#!/usr/bin/env node
const fs = require('fs');

var prototypePolyfills = fs.readFileSync(require.resolve('extendscript-es5-shim'), 'utf8') +
                         fs.readFileSync(require.resolve('extendscript-es6-shim'), 'utf8');

var file = fs.readFileSync('src/test.js', 'utf8');

fs.writeFileSync('dist/test.js', prototypePolyfills + file);
