interface Config {

  /**
   * `--query`: the query to search. It could be a query string or a text file with the query. If a files
   * exists it will be used, otherwise it assumes that is a query string. Examples: `--query "//* [@name ==
   * 'foo']"`, `--query ./queries/myLongQuery.txt`
   */
  query: string
  /**
   * `--files`: TypeScript files to search. Valid files are .ts, .tsx, .js, .jsx. The value could be a glob
   * pattern, in that case all files matching the pattern will be the input. Examples: `--query "//* [@name ==
   * 'foo']"`, `--query ./queries/myLongQuery.txt`
   */
  files?: string
  /**
   * `--project`: TypeScript project in which to search. It could be a folder or a `tsconfig.json` path. If
   * `--files` also given it will be used as a filter pattern.
   */
  project?: string
  /**
   * `--params`: query parameters. It could be a json file containing an object or a literal json text.
   */
  params?: string
  /**
   * `--output`: the output style. Valid values: `nodePath`, `text`, `name`, `filePath`, or a combination of
   * any of them. By default is `nodePath` which is a selector-like string uniquely identifying the node in
   * its project.
   */
  output?: Output[]

  /**
   * --outputFile`: If given the search result will be written in that file, otherwise will be written in stdout.
   */
  outputFile?: string

  help?: string
}

type Output = 'nodePath' | 'text' | 'name' | 'filePath'

async function cliMain() {
  const options = require('yargs-parser')(process.argv.slice(2)) as Config

  if (options.help) {
    printHelp()
    process.exit(0)
  }
  if (!options.query) {
    console.error(`--query argument is mandatory and none was given. Aborting.`);
    process.exit(1)
  }
  if (!options.files && !options.project) {
    console.error(`One of --files or --project arguments is mandatory and none was given. Aborting.`);
    process.exit(1)
  }
}

function printHelp() {
  console.log(`
Usage: cannabis --query --files "src/**/foo/**/*"

Usage Examples: 
ts-refactor organizeImports "./src/**" "./spec/**/*Spec.ts" --dontAsk
ts-refactor moveDeclaration src/foo/model2.ts src/foo/abstract/abstractModels.ts --tsConfigPath ../another/project/tsconfig.json

Tool options:
 --tsConfigPath
 --dontWrite
 --dontConfirm
 --dontAsk
 --help
 --debug

Run ts-refactor --interactiveHelp for more details or see the project's README.
  `)
}

cliMain().catch(error => {
  console.error('Error: ' + error)
  error.stack && console.log(error.stack.split('\n').join('\n'))
  process.exit(1)
})
