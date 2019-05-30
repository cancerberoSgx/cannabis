"use strict";
// import "babel-polyfill"
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var BrowserFS = require("browserfs");
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
function tt() {
    return __awaiter(this, void 0, void 0, function () {
        var ffff;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
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
                        fs: "IndexedDB",
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
                        fs.readdir('/', function (e, contents) {
                            // etc.
                            console.log(e, contents);
                        });
                    });
                    return [4 /*yield*/, createIndexDbFs()];
                case 1:
                    ffff = _a.sent();
                    console.log('sebsbsb', ffff.readdirSync('.'));
                    return [2 /*return*/];
            }
        });
    });
}
tt();
function ok(a) {
    if (!a) {
        throw new Error('expected ' + a + ' to be truthy');
    }
}
/**
 * Usage : ` const fs2 = await createIndexDbFs('seba')`
 */
function createIndexDbFs(storeName) {
    return new Promise(function (resolve, reject) {
        BrowserFS.configure({
            fs: "IndexedDB",
            options: {
                // options for the file system
                storeName: storeName
            }
        }, function (e) {
            if (e) {
                // An error occurred.
                // throw e;
                reject(e);
            }
            // Otherwise, you can interact with the configured backends via our Node FS polyfill!
            var fs = BrowserFS.BFSRequire('fs');
            // debugger
            fs.readdir('/', function (e, contents) {
                // etc.
                console.log(e, contents);
                resolve(fs);
            });
        });
    });
}
// function fsOperationCreator(fs:FS, fn: (fs: FS, ...args: any[])=>any){
// return fn
// }
// return 
function rm_rf(fs, dirPath) {
    try {
        var files = fs.readdirSync(dirPath);
    }
    catch (e) {
        return;
    }
    if (files.length > 0) {
        for (var i = 0; i < files.length; i++) {
            var filePath = dirPath + '/' + files[i];
            if (fs.statSync(filePath).isFile())
                fs.unlinkSync(filePath);
            else
                rm_rf(fs, filePath);
        }
    }
    fs.rmdirSync(dirPath);
}
;
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
