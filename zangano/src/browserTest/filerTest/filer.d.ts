

// declare module 'filer' {
//   type FileSystem = typeof import('fs')
// type Env = typeof process.env

//   const fs:  FileSystem & {Shell: ShellConstructor}&FileSystem['promises']
//    const path: typeof import('path') & typeof import('path')

//    const toExport : {fs: FileSystem , FileSystem: FileSystemConstructor, Shell: ShellConstructor, path: typeof import('path')}
//    export = toExport

// interface ShellConstructor {
//   new (options?: ShellOptions): Shell
// }

// interface FileSystemConstructor {
//   new (...args:[]):FileSystem
// }
// interface ShellOptions {
//   /**a reference to the bound FileSystem */
//   readonly fs: FileSystem  
//   /**the shell's environment. The shell's environemnt env object has get(name) and set(name, value) */
//   readonly env: Env  &{get(n:string):string,set(n:string,v:string):void}
// }

// interface ShellBase {
//   /**a reference to the bound FileSystem */
//   readonly fs: FileSystem  
//   /**the shell's environment. The shell's environemnt env object has get(name) and set(name, value) */
//   readonly env: Env  &{get(n:string):string,set(n:string,v:string):void}
// }
// interface Shell extends ShellBase{
//   promises: ShellPromises  
//   // cd(p:string, cb:Cb)
// }

// interface ShellPromises extends ShellBase{
//   cd(p:string):Promise<void>
//   // pwd( ):Promise<string>  // Issue : not present
//   mkdir(p:string):Promise<void>
//   cat(files:string[]):Promise<string>
//   ls(p:string):Promise<string[]>
// }


// }


// // Node promises API: 
// // import {promises} from 'fs'