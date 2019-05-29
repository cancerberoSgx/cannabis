const { parse } = require('postcss-values-parser');

const root = parse('@media only screen and (min-width: 1200px)');
const node = root.first;
console.log('@media only screen and (min-width: 1200px)'.split(/[\s()]/).map(w=>parse(w).nodes))

