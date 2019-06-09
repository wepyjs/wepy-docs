const assert = require('assert');

let cases = require('../data/cases.json');

assert.ok(typeof cases === 'object', 'cases.json is not a JSON');
let donate = require('../data/donate.json');

assert.ok(typeof donate === 'object', 'donate.json is not a JSON');

console.log('Pass: Valid JSON');

