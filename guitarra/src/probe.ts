import { isArray, inspect } from 'util';
import { queryAst } from './queryAst';
import { parseCss } from "./parseCss";

// test2()
function test2(){
  let result = queryAst('// *', `@media (min-width: 1023px) {
    border: 1 px solid pink;
  }`);
  console.log(result.result!.map(r=>r.type))
}

// test1();
function test1() {
  let root = parseCss(`@media (min-width: 1023px) {
  border: 1 px solid pink;
}`);
  console.log(inspect(root));
  
}


// test3()
function test3(){
  const { parse } = require('postcss-values-parser');
  // let result = parse(  `1023px`);
  let result = parse(  `1px sold pink`);
  console.log(result)
}