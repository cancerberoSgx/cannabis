import test from 'ava'
import { queryAst } from './queryAst'

test('one kind descendant', t => {
  let result = queryAst('// *', `@media (min-width: 1023px) {
    border: 1 px solid pink;
  }`)
  t.deepEqual(result.result!.map(r => r.type), [
    'atrule', 'decl', 'value', 'numeric', 'word', 'word', 'word'
  ])
})
