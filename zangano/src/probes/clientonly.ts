// import "babel-polyfill"

import * as BrowserFS from 'browserfs'
// import  BrowserFS from 'browserfs'

import FS from 'browserfs/dist/node/core/FS';

// function createIndexDbFs(storeName?: string): Promise<IndexedDBFileSystem> {
//   return new Promise((resolve, reject) => {
//     BrowserFS.FileSystem.IndexedDB.Create({ storeName }, ((err, d) => {
//       if (err) { reject(err) }
//       else { resolve(d) }
//     })
//     )
//   }
//   )
// }

// interface FS {
  
// }

async function tt() {
  // try {
  //   const fs = await createIndexDbFs('seba')
  //   debugger
  //   ok(fs)
  //   // ok(fs.supportsSynch())
  //   equal(fs.readdirSync('.').length, 0)
  // } finally {
  //   console.log('finish');
  // }

  BrowserFS.configure({
    fs: "IndexedDB", // from Backends table below,
    options: {
      // options for the file system
    }
  }, function (e) {
    if (e) {
      // An error occurred.
      throw e;
    }
    // Otherwise, you can interact with the configured backends via our Node FS polyfill!
    var fs = BrowserFS.BFSRequire('fs');
    // debugger
    fs.readdir('/', function(e, contents) {
      // etc.
      console.log(e, contents);
          });
  });


  const ffff = await createIndexDbFs()
  console.log('sebsbsb' ,   ffff.readdirSync('.'));
 
}
tt()


function ok(a: any) {
  if (!a) {
    throw new Error('expected ' + a + ' to be truthy');
  }
}


/**
 * Usage : ` const fs2 = await createIndexDbFs('seba')`
 */
function createIndexDbFs(storeName?: string):  Promise<FS>{
  return new Promise((resolve, reject)=>{
    BrowserFS.configure({
      fs: "IndexedDB", // from Backends table below,
      options: {
        // options for the file system
        storeName
      }
    }, function (e) {
      if (e) {
        // An error occurred.
        // throw e;
        reject(e)
      }
      // Otherwise, you can interact with the configured backends via our Node FS polyfill!
      var fs = BrowserFS.BFSRequire('fs');
      // debugger
      fs.readdir('/', function(e, contents) {
        // etc.
        console.log(e, contents);
        resolve(fs)
        
      });
    });
  
  })
}

// function fsOperationCreator(fs:FS, fn: (fs: FS, ...args: any[])=>any){
// return fn
// }
  // return 
  function rm_rf(fs: FS, dirPath: string) {
    try { var files = fs.readdirSync(dirPath); }
    catch(e) { 
      return; 
    }
    if (files.length > 0){
      for (var i = 0; i < files.length; i++) {
        var filePath = dirPath + '/' + files[i];
        if (fs.statSync(filePath).isFile())
          fs.unlinkSync(filePath);
        else
        rm_rf(fs, filePath);
      }}
    fs.rmdirSync(dirPath);
  };
  
// }
// /**
//  * Usage : ` const fs2 = await createIndexDbFs('seba')`
//  */
// function createIndexDbFs(storeName?: string): Promise<FSModule> {
//   return new Promise((resolve, reject) => {
//     BrowserFS.configure({
//       fs: "IndexedDB", // from Backends table below,
//       options: {
//         storeName
//         // options for the file system
//       }
//     }, function (e) {
//       if (e) {
//         // An error occurred.
//        reject(e)
//       }else {
//         var fs = BrowserFS.BFSRequire('fs');
//         resolve(fs)
//       }

//     // BrowserFS.FileSystem.IndexedDB.Create( {}, ((err, d) => {
//     //   if (err) { reject(err) }
//     //   else { resolve(d) }
//     // })
//     // )
//   }
//     )
// })
// }
//   // Otherwise, you can interact with the configured backends via our Node FS polyfill!
  

// // });