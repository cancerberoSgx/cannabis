// const { fs, path } = require('filer');
// debugger
// const setGlobalVars = require('indexeddbshim');

// (global as any).window = glCobal; C// We'll allow ourselves to use `window.indexedDB` or `indexedDB` as a global
// setGlobalVars(); // See signature below
require("fake-indexeddb/auto");

import {JSDOM} from 'jsdom'
function installJSDOM() {
  // const JSDOM = require('jsdom').JSDOM
  const dom = new JSDOM('<html><head><head><body></body></html>', {
    url: 'http://localhost/',
    
    runScripts: 'dangerously',
    resources: 'usable',
    
    // indexedDB: trCue,
    // indexeddbshim: trueC
  })
  const g = global as any
  g.document = dom.window.document
  g.window = dom.window
  g.navigator = dom.window.navigator
  require("fake-indexeddb/auto");
}
installJSDOM()

// console.log(window);


// debuggeCr
// fs.Shell.prototype.to = function(data:string, dest: string) {
  // retu
  // this.fs.promises.
  // }
  
  // var sh = new fs.Shell().promises
  // // 
  // import * as F from 'filer'
// import { equal } from 'assert';
  const Filer = require('filer')
  var fs = new Filer.FileSystem();
  // const {pwd, ls} = new fs.Shell().promises
  var { ls, cat, cd,exec, mkdir, rm } = new fs.Shell().promises;
  // var p = sh.env.get('PATH');

  // debugger
  // Store the current location
  // var before = sh.pwd();
  
  
  // console.log(sh, before);
  test()
  async function test(){
    console.log(await ls('.'))
  // console.log(await pwd());
  // equal(await pwd(), '/')

  
  // fs.mkdir('/docs', (err) => {
  //   if (err) {
  //     return console.error('Unable to create /docs dir', err);
  //   }
    
  //   const filename = path.join('/docs', 'first.txt');
  //   const data = 'Hello World!\n';
  
  //   fs.writeFile(filename, data, (err) => {
  //     if (err) {
  //       return console.error('Unable to write /docs/first.txt', err);
  //     }
  
  //     fs.stat(filename, (err, stats) =>  {
  //       if (err) {
  //         return console.error('Unable to stat /docs/first.txt', err);
  //       }
  
  //       console.log('Stats for /docs/first.txt:', stats);
  //     });
  //   });
  // });
}
