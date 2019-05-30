// // // import {promises} from 'fs'


// // import { JSDOM } from 'jsdom';
// // require("fake-indexeddb/auto");
// // const dom = new JSDOM('<html><head><head><body></body></html>', {
// //   url: 'http://localhost/',
// //   runScripts: 'dangerously',
// //   resources: 'usable',
// // });
// // const g = global as any;
// // g.document = dom.window.document;
// // g.window = dom.window;
// // g.navigator = dom.window.navigator;


// // // import {prepareIndexDb} from '../filerTest/prepareDom';
// // // prepareIndexDb()
// // import test from 'ava'
// // // import { promisify } from '../../fs/util';


// import * as BrowserFS from 'browserfs'  
// // // BrowserFS.FileSystem.IndexedDB
// import IndexedDBFileSystem from 'browserfs/dist/node/backend/IndexedDB';
// import { ok, notEqual } from 'assert';
// // import { sleep } from 'misc-utils-of-mine-generic';
// // // import IndexedDBFileSystem from 'browserfs';

// import puppeteer, { Page }  from 'puppeteer';
// import { notFalsy } from 'misc-utils-of-mine-typescript';
// import { sleep } from 'misc-utils-of-mine-generic';

// async function tt(){


// const browser = await puppeteer.launch();
// const page = await browser.newPage();
// try {
//   await page.goto('https://google.com');
//   // await run(t, page);await page.goto(url);
// 	ok((await page.title()).includes('Google'));

//   // await sleep(3000)
// 	// notEqual(!!await page.$('#hplogo') ,true)




//   function createIndexDbFs (storeName?: string): Promise<IndexedDBFileSystem>{
//     return new Promise((resolve, reject)=>{
//       const BrowserFS = require('browserfs') as (typeof import('browserfs'))
//       BrowserFS.FileSystem.IndexedDB.Create({storeName},  ((err, d)=>{
//         if(err){reject(err)}
//         else {resolve(d as any)}
//       })
//       )}
//     )
        
//     }
//   const fs2 = await createIndexDbFs('seba')

//   ok  (fs2)
//  ok(fs2.supportsSynch())

// } finally {
//   await page.close();
//   await browser.close();
// }

//   }
//   tt()

// //   //@ts-ignore
      
     
// // //  function initFs(){
// // //    return new Promise(resolve=>{
// // //     BrowserFS.configure({
// // //       fs: "MountableFileSystem",
// // //       options: {r
// // //         // "/zip": {
// // //         //   fs: "ZipFS",
// // //         //   options: {
// // //         //     // Wrap as Buffer object.
// // //         //     zipData: Buffer.from(zipData)
// // //         //   }
// // //         // },
// // //         "/tmp": { fs: "InMemory" },
// // //         "/home": { fs: "IndexedDB" }
// // //       }
// // //     }, function(e) {
// // //       if (e) {
// // //         // An error occurred.
// // //         throw e;
// // //       }
// // //       // Otherwise, BrowserFS is ready to use!
// // //       // const new BrowserFS.getFileSystem()
// // //       resolve()
// // //     })
// // //    })
// // //  }


// // });

// // // import * as Filer from 'filer'
// // // test('indexDb - filer not typed', async t=>{
// // //   var fs = new Filer.FileSystem();
// // //   var { ls, cat, cd,exec, mkdir, rm } = new fs.Shell().promises;
// // //   t.deepEqual(await ls('.'), [])
// // // })
