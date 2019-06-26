import { existsSync, writeFileSync } from 'fs'
import { extractMemberSignatures } from '../extractMemberSignatures'
import { listInterfaces } from '../printInterfaces'
import { Options } from "../types"

export function main() {
  const options = require('yargs-parser')(process.argv.slice(2)) as Options
  preconditions(options)
  if (options.listInterfaces) {
    const out = listInterfaces(options)
    console.log('Interfaces found: \n' + out.map(o => `"${o.name}" (${o.path})`).join('\n * '))
  } else {
    const results = extractMemberSignatures(options)
    let output: string = ''
    if (options.generateMarkdownDocs) {
      output = results.map(r => r.markdown).join('\n--------\n')
    } else {
      output = JSON.stringify(results, null, 2)
    }
    if (options.output) {
      writeFileSync(options.output, output)
    } else {
      process.stdout.write(output + '\n')
    }
  }
}

function preconditions(options: Options) {
  if (!options.project) {
    options.project = './tsconfig.json'
  }
  if (options.help) {
    printHelp()
    process.exit(0)
  }
  if (!options.project && !options.files || !options.target && !options.listInterfaces) {
    printHelp()
    fail(`Incorrect usage. --target or --listInterfaces are mandatory but none was given.`)
  }
  if (!existsSync(options.project!)) {
    fail(`Incorrect call. --project tsconfig.json must exists. If not given './tsconfig.json' is assumed (current dir). Aborting.`)
  }
}

function fail(s: string) {
  console.error(s)
  process.exit(1)
}

function printHelp() {
  console.log(`
Usage: typescript-member-signatures --project foo/bar/tsconfig.json --target "**/area44/**/services/**/LoginService"   

If you are having trouble selecting interface use --listInterfaces

Options:

* --project?: string: TypeScript project in which to search the target interface, must point to a tsconfig.json file.
* --target: string: Glob pattern pointing to the target interface. Example: "** /area44/** /services/** /LoginService".
* --output?: string: If given the result will be written to this file, if not to stdout.
* --files?: string: Extract from these files. If project is also provided, add this extra files to it.
Can be a file name or a glob pattern.
* --ignoreMemberWithUnderscorePrefix?: boolean: Will ignore members which names start with '_'
* --onlySignature?: boolean: Return only the signatures, don't generate jsdocsText, etc. only name and signature.
* --generateMarkdownDocs?: boolean: Will generate markdown text for the interface and its members suitable to include in README.md API section.
* --help?: boolean:
* --debug?: boolean:
* --listInterfaces?: boolean: If given prints found interfaces and their paths to stdout and exit. If target is given prints interfaces only on matched files/dirs, if none given prints all interfaces in project.

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
