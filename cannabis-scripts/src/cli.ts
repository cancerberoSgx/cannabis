import {MethodSignatureStructure} from 'ts-morph'
import { getASTNodeKindName } from 'cannabis';
import { AssertionError } from 'assert';
import { fstat, writeFileSync } from 'fs';
import { extractMemberSignatures } from './extractMemberSignatures';

export interface Options {
  /**
   * TypeScript project in which to search the target interface, must point to a tsconfig.json file.
   */
  project: string
  /**
   * Glob pattern pointing to the target interface. Example: "** /area44/** /services/** /LoginService".
   */
  target: string
  /**
   * If given the result will be written to this file, if not to stdout.
   */
  output?: string
  help?: boolean
}

export function main(){
  const options = require('yargs-parser')(process.argv.slice(2)) as Options
  preconditions(options)
  const results = extractMemberSignatures(options)
  const output = JSON.stringify(results, null, 2)
  if(options.output){
    writeFileSync(options.output, output)
  }else {
    process.stdout.write(output+'\n')
  }
}

function preconditions(options: Options) {
  if (options.help) {
    printHelp();
    process.exit(0);
  }
  if (!options.project||!options .target) {
    fail(`--project and --target arguments are mandatory but one was missing. Aborting.`);
  }
}

function fail(s: string) {
  console.error(s);
  process.exit(1);
}

function printHelp() {
  console.log(`
Usage: buildMemberSignatureDocs --project foo/bar/tsconfig.json --target "**/area44/**/services/**/LoginService"   

Options:

   * '--project': TypeScript project in which to search the target interface, must point to a tsconfig.json file.
   * --target: a glob pattern pointing to the target interface. Example: "**/area44/**/services/**/LoginService".
  `)
}




// function test(){
//   const result = extractMethodSignatureDocs({
//     project: 'src/testAssets/tsconfig.json', 
//     target: '**/G'
//   })
//   console.log(JSON.stringify(result, null, 2));
// }

// test()