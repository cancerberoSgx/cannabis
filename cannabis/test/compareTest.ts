import test from 'ava'
import { compareText, compareTexts } from 'misc-utils-of-mine-generic'

test('compareText contains, contained', t => {
  t.true(compareText('class123', 'class', { verb: 'contains' }))
  t.false(compareText('class123', 'xx', { verb: 'contains' }))
  t.false(compareText('class123', 'class', { verb: 'contained' }))
  t.true(compareText('class123', 'class12322', { verb: 'contained' }))
})

test('compareText negate', t => {
  t.false(compareText('class123', 'class', { negate: true, verb: 'contains' }))
  t.true(compareText('class123', 'xx', { negate: true, verb: 'contains' }))
  t.true(compareText('class123', 'class', { negate: true, verb: 'contained' }))
  t.false(compareText('class123', 'class12322', { negate: true, verb: 'contained' }))
})

test('compareTexts multiplicity contains, contained', t => {
  t.true(compareTexts(['foo123', 'bar123'], ['foo'], { verb: 'contains' }))
  t.false(compareTexts(['foo123', 'bar123'], 'foo', { verb: 'contains', multiplicity: 'allOf' }))
  t.true(compareTexts(['foo123', 'bar123'], ['foo123123'], { verb: 'contained' }))
  t.false(compareTexts(['foo123', 'bar123'], ['s'], { verb: 'contained' }))
  t.false(compareTexts(['foo123', 'bar123'], 'foo123123', { verb: 'contained', multiplicity: 'allOf' }))
  t.true(compareTexts(['foo123', 'bar123'], 'foo123123bar123123', { verb: 'contained', multiplicity: 'allOf' }))
})

test('compareText allOf issue 1', t => {
  t.true(compareTexts(['C', 'B', 'A'].join(','), ['B', 'A'], { verb: 'contains', multiplicity: 'allOf' }))
})


