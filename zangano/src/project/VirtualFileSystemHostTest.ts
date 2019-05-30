import test from 'ava'
import { ts } from 'ts-morph'
import { createProject } from './createProject'
import { getType } from './util'
import { VirtualFileSystemHostConstructor } from './VirtualFileSystemHost';

test('VirtualFileSystemHostConstructor', t => {
  const fs = new VirtualFileSystemHostConstructor()
  fs.writeFileSync('/foo.ts', 'var a = 1')
  t.is(fs.readFileSync('/foo.ts'), 'var a = 1')
})

