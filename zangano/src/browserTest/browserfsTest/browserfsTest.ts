// import { ok } from 'assert';
// import IndexedDBFileSystem from 'browserfs/dist/node/backend/IndexedDB';
// import puppeteer from 'puppeteer';
// import { appendFileSync } from 'fs';
// import { inspect } from 'util';

// async function tt(){

// const browser = await puppeteer.launch();
// const page = await browser.newPage();
// page.on('console', e=>{
//   appendFileSync('pupLogs.txt', e.type() + ' - ' + e.text()+ ' - ' + e.args().map(a=>inspect(a))+'\n')
// })

// try {
//   await page.goto('https://google.com');
// 	ok((await page.title()).includes('Google'));
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
