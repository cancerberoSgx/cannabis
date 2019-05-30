import * as git from 'isomorphic-git'
import { pathJoin, serial } from 'misc-utils-of-mine-generic'
import { VirtualFileSystemHostConstructor } from './VirtualFileSystemHost';
import { importDirectoryFromBrowserDir } from './importDirectory';
import { equal, ok, deepEqual } from 'assert';

async function testImportDirectory(){
  const fs = new VirtualFileSystemHostConstructor()
  deepEqual(fs.readDirSync('/'), []);
  await importDirectoryFromBrowserDir('/tutorial', fs)
  deepEqual(fs.readDirSync('/'),['/tutorial']);
  const f1 = fs.readFileSync('/tutorial/tsconfig.json')
  console.log(f1);
  ok  (f1.length>20 && f1.includes(`"compilerOptions":`))
}

testImportDirectory()