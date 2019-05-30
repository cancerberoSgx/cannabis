import test from 'ava'
import { VirtualFileSystemHostConstructor } from './VirtualFileSystemHost'

test('VirtualFileSystemHostConstructor', t => {
  const fs = new VirtualFileSystemHostConstructor()
  fs.writeFileSync('/foo.ts', 'var a = 1')
  t.is(fs.readFileSync('/foo.ts'), 'var a = 1')
})

