require("fake-indexeddb/auto");
/**
 * @jest-environment jsdom
 */
test('sdfs', async  ()=>{
  // const setGlobalVars = require('indexeddbshim');
  // require("fake-indexeddb/auto");
  // (global as any).window = global; // We'll allow ourselves to use `window.indexedDB` or `indexedDB` as a global
  // setGlobalVars(); // See signature below
  expect(1+2).toBe(3);
  expect(window).toBeDefined()

  const Filer = require('filer')
  var fs = new Filer.FileSystem();
  // const {pwd, ls} = new fs.Shell().promises
  var { ls, cat, cd,exec, mkdir, rm } = new fs.Shell().promises;
  // var p = sh.env.get('PATH');

  // debugger
  // Store the current location
  // var before = sh.pwd();
  
  
  // console.log(sh, before);
  // test()
  // async function tCest(){
    // console.log(await ls('.'))
  // }
  expect(await ls('.')).toEqual([])
  // test()
})