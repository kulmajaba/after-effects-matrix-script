#!/usr/bin/env node
const fs = require('fs');
const { program } = require('commander');

program.version('0.0.1');
program
  .option('-i, --input <input>', 'input file path')
  .option('-o, --output <output>', 'output file path')

program.parse(process.argv);

const opts = program.opts();

var prototypePolyfills = fs.readFileSync(require.resolve('extendscript-es5-shim'), 'utf8') +
                         fs.readFileSync(require.resolve('extendscript-es6-shim'), 'utf8');

var file = fs.readFileSync(opts.input, 'utf8');

fs.writeFileSync(opts.output, prototypePolyfills + file);
