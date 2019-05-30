
// import * as BrowserFS from 'browserfs'  
// // // BrowserFS.FileSystem.IndexedDB
// // import IndexedDB from 'browserfs/dist/node/backend/IndexedDB';
// // import { sleep } from 'misc-utils-of-mine-generic';
// // // import IndexedDBFileSystem from 'browserfs';


// import test, {ExecutionContext} from 'ava'
// // import './prepareDom';

// // import test from 'ava';
// import withPage from './_withPage';
// import {  Page } from 'puppeteer';

// const url = 'https://google.com';

// test('page title should contain "Google"', withPage, async (t:ExecutionContext, page: Page) => {
//   await page.goto(url);
// //   const Filer = require('filer')  
// // var fs = new Filer.FileSystem();
// // var { ls, cat, cd,exec, mkdir, rm } = new fs.Shell().promises;
// // t.deepEqual(await ls('.'), [])2


// function createIndexDbFs (storeName?: string): Promise<BrowserFS.sy>{
//   return new Promise((resolve, reject)=>{
//     const BrowserFS = require('browserfs') as (typeof import('browserfs'))
//     BrowserFS.FileSystem.IndexedDB.Create({storeName},  ((err, d)=>{
//       if(err){reject(err)}
//       else {resolve(d as any)}
//     })
//     )}
//   )     
//   }
//   const fs2 = await createIndexDbFs('seba')
//  t.truthy(fs2.supportsSynch())



// 	t.true((await page.title()).includes('Google'));
// });

// //@ts-ignore
// test('page should contain an element with `#hplogo` selector', withPage, async (t, page) => {
// 	await page.goto(url);
// 	t.not(await page.$('#hplogo'), null);
// });
// //@ts-ignore

// test('search form should match the snapshot', withPage, async (t, page) => {
//   await page.goto(url);
//   //@ts-ignore
// 	const innerHTML = await page.evaluate(form => form.innerHTML, await page.$('#searchform'));
// 	// t.snapshot(innerHTML);
// });


// // const Filer = require('filer')  
// // var fs = new Filer.FileSystem();
// // var { ls, cat, cd,exec, mkdir, rm } = new fs.Shell().promises;
// // t.deepEqual(await ls('.'), [])
// // test('indexDb - filer not typed', async t=>{
// // })
