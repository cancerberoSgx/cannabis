import IndexedDBFileSystem from 'browserfs/dist/node/backend/IndexedDB';
import { wrapInHtml } from 'misc-utils-of-mine-generic';
// import { AssertionError } from 'assert';

console.log('begin');


async function tt(){
  try {
    function createIndexDbFs (storeName?: string): Promise<IndexedDBFileSystem>{
      return new Promise((resolve, reject)=>{
        const BrowserFS = require('browserfs') as (typeof import('browserfs'))
        BrowserFS.FileSystem.IndexedDB.Create({storeName},  ((err, d)=>{
          if(err){reject(err)}
          else {resolve(d as any)}
        })
        )}
        )
      }
      const fs2 = await createIndexDbFs('seba')
      ok  (fs2)
      ok(fs2.supportsSynch())
    } finally {
      console.log('finish');      
    }
  }
  tt()
  
  
  function ok(a:any){
    if(!a){
      throw new Error('expected ' + a  + ' to be truthy');
    }
  }
  
  // document.write(wrapInHtml(`seba`))