// import { asArray } from 'misc-utils-of-mine-generic';

// type TextCompareMode = 'contains' | 'contained' | 'equals' | 'startsWith' | 'endsWith'
// export type Multiplicity = 'anyOf' | 'allOf'

// interface BaseCompareOptions {
//   negate?: boolean,
// }

// export interface CompareTextOptions extends  BaseCompareOptions {
//   caseInsensitive?: boolean
//   asCode?: boolean
//   verb?: TextCompareMode
// }

// interface CompareWithMultiplicityOptionsConcrete {
//   multiplicity?: Multiplicity
// }

// export interface CompareOptions extends  CompareWithMultiplicityOptionsConcrete, BaseCompareOptions{

// }

// export interface CompareTextsOptions extends CompareTextOptions, CompareWithMultiplicityOptionsConcrete{

// }

// export function compareTexts(
//   actual: string | string[],
//   expected: string | string[],
//   options: CompareTextsOptions) {
//   return compareWithMultiplicity(actual, expected, options, compareText)
// }

// export function compareText(
//   actual: string,
//   expected: string,
//   options: CompareTextOptions,
// ) {
//   // if ((actual === undefined && expected !== undefined) || (actual !== undefined && expected === undefined)) {
//   //   return options.negate ? negate(false) : false
//   // }
//   if (actual === expected) {
//     return options.negate ? negate(true) : true
//   }
//   actual = buildText(actual!, options)
//   expected = buildText(expected!, options)
//   if (!options.verb || options.verb === 'contains') {
//     return options.negate ? negate(actual.includes(expected)) : actual.includes(expected)
//   } else if (options.verb === 'equals') {
//     return options.negate ? negate(actual === expected) : actual === expected
//   } else if (options.verb === 'contained') {
//     return options.negate ? negate(expected.includes(actual)) : expected.includes(actual)
//   } else if (options.verb === 'endsWith') {
//     return options.negate ? negate(actual.endsWith(expected)) : actual.endsWith(expected)
//   } else if (options.verb === 'startsWith') {
//     return options.negate ? negate(actual.startsWith(expected)) : actual.startsWith(expected)
//   } else {
//     return options.negate ? negate(false) : false
//   }
// }

// function compareWithMultiplicity<T>(
//   _actual: T | T[],
//   _expected: T | T[],
//   options: CompareOptions,
//   predicate: (actual: T, expected: T, options: CompareOptions) => boolean,

// ) {
//   const actual = asArray(_actual)
//   const expected = asArray(_expected)
//   // if ((actual === undefined && expected !== undefined) || (actual !== undefined && expected === undefined)) {
//   //   return false
//   // }
//   if (actual === expected) {
//     return options.negate ? negate(true) : true
//   }
//   if (!options.multiplicity || options.multiplicity === 'anyOf') {
//     return options.negate ? negate(!!actual.find(a => !!expected!.find(e => predicate(a, e, options)))) : !!actual.find(a => !!expected!.find(e => predicate(a, e, options)))
//   } else if (options.multiplicity === 'allOf') {
//     return options.negate ? negate(!actual.find(a => !!expected!.find(e => !predicate(a, e, options)))) : !actual.find(a => !!expected!.find(e => !predicate(a, e, options)))
//   } else {
//     return options.negate ? negate(false) : false
//   }
// }

// function negate(b: boolean) {
//   return !b
// }

// function buildText(text: string, options: CompareTextOptions) {
//   if (options.caseInsensitive) {
//     text = text.toLowerCase()
//   }
//   if (options.asCode) {
//     text = text.replace(/\s+/g, ' ').trim()
//   }
//   return text
// }
