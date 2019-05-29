import test from 'ava'
import { parseCss, visit } from './parseCss'
import { printTypes, printTypeAndAttrs } from './debug'

test('printTypes', t => {
  const p = parseCss(`a{border: 1px solid #ededed}`)
  t.is( printTypes(p).trim(), `root
  rule
    decl
      value
        word
        word
        numeric`.trim());
      })

      test('printTypeAndAttrs', t => {
  const p = parseCss(`a{border: 1px solid #ededed}`)
t.is( printTypeAndAttrs(p).trim(), `
<root >
  <rule selector="a">
    <decl prop="border" value="1px solid #ededed">
      <value >
        <word value="#ededed" isColor="true" isHex="true" isUrl="false" isVariable="false">
        <word value="solid" isColor="false" isHex="false" isUrl="false" isVariable="false">
        <numeric value="1" unit="px">`.trim());
  
})
