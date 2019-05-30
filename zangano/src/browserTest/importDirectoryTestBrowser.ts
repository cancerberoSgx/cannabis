import { deepEqual, ok } from 'assert'
import { importProjectFromDirectory } from '../project/importDirectory'
import { VirtualFileSystemHostConstructor } from '../project/VirtualFileSystemHost'

async function testImportDirectory() {
  const fs = new VirtualFileSystemHostConstructor()
  deepEqual(fs.readDirSync('/'), [])
  await importProjectFromDirectory('/tutorial', fs)
  deepEqual(fs.readDirSync('/'), ['/tutorial'])
  const f1 = fs.readFileSync('/tutorial/tsconfig.json')
  console.log(f1)
  ok(f1.length > 20 && f1.includes(`"compilerOptions":`))
}

testImportDirectory()
