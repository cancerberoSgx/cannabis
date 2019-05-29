import test from 'ava'
import { readFileSync } from 'fs'
import { printTypeAndAttrs } from './debug'
import { parseCss } from './parseCss'
import { queryAst } from './queryAst'

test('css1 1', t => {
  const p = parseCss(readFileSync('fixtures/css1.css').toString())
  // exec
  t.truthy(printTypeAndAttrs(p).length > 1000)
  // const r = queryAst(`// numeric [@number >=0 && @number<=10 && @unit=='em']`, p)
  // const r = queryAst(`// numeric [@number >=0 && @number<=10 && @unit=='rem']`, p)
  // console.log(queryAst(`// numeric [@number >=0 && @Cnumber<=10 && @unit=='rem']`, p).result!.map(a=>a.value+'-'+a.unit))
  t.deepEqual(queryAst(`// numeric [@number >=0 && @number<=10 && @unit=='rem']`, p).result!.map(a => a.value + '-' + a.unit), ['1.4-rem', '0.9-rem', '2.2-rem', '1-rem', '1-rem', '1-rem', '.7-rem'])
  // console.log('HHSHSHSH0', queryAst(`// numeric [@number >=0 && @number<=10 && @unit=='em']`, p).result!.map(a=>a.value));

})
