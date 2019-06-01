import { test } from 'shelljs'
import { join } from 'path'
import { loadProject, getASTNodePath, QueryResult, getASTNodeFilePath, ASTNode, queryAst, getASTNodeName, getASTNodeKindName, getASTNodeText } from 'cannabis'
import { arrayToObject, tryTo, notUndefined } from 'misc-utils-of-mine-generic'
import { writeFileSync, readFileSync } from 'fs'
import { sync } from 'glob'

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
   * `--output`: the output style. Valid values: `nodePath`, `text`, `name`, `filePath`, `kind`, or a combination of
   * any of them. By default is `nodePath` which is a selector-like string uniquely identifying the node in
   * its project.
   */
  output?: Output[]

  /**
   * `--outputFile`: If given the search result will be written in that file, otherwise will be written in stdout.
   */
  outputFile?: string

  // /**
  //  * `--one`: If given will stop searching when a node matches so result will be at most 1 node. Otherwise it 
  //  * will search on every file and all matching nodes will be returned.
  //  */
  // one?: boolean

  /**
   * `--outputCompress`: if given JSON output will be minified.
   */
  outputCompress?: boolean

  /** 
   * Just print the result count.
   */
  outputCount?: boolean

  help?: string
}

type Output = 'nodePath' | 'text' | 'name' | 'filePath' | 'kind'

export async function main() {
  const options = require('yargs-parser')(process.argv.slice(2)) as Config

  preconditions(options)
  
  const query = test('-f', options.query) ? tryTo(() => JSON.parse(readFileSync(options.query).toString())) : options.query
  if (!query) {
    fail('Unable to read query from ' + options.query)
  }

  let result: Partial<QueryResult> | undefined
  
  if (options.project) {
    let tsConfigFile = options.project
    if (test('-d', options.project)) {
      tsConfigFile = join(options.project, 'tsconfig.json')
    }
    if (!test('-f', tsConfigFile)) {
      fail(`Project's tsconfig.json file cannot be found, exiting.`)
    }
    const p = loadProject(tsConfigFile)
    const root = p.getRootDirectory()
    result = queryAst(query, root)
  }
  else if (options.files) {
    const files = test('-f', options.files) ? [options.files] : sync(options.files)
    const { error } = queryAst(query, 'var a')
    if (error) {
      result = { error }
    } else {
      result = { result: files.map(f => queryAst(query, readFileSync(f).toString()).result).filter(notUndefined).flat() }
    }
  }
  if (result) {
    if (result.error) {
      fail(`An error ocurred: \n ${printError(result.error)}`)
    }
    let outputText = ''
    if (options.outputCount) {
      outputText = result.result!.length + ''
    } 
    else {
      const output = getResultOutput(result.result!, options.output)
      outputText = options.outputCompress ? JSON.stringify(output) : JSON.stringify(output, null, 2)
    }
    if (options.outputFile) {
      writeFileSync(options.outputFile, outputText)
    } else {
      process.stdout.write(outputText + '\n')
    }
  }
}

function getResultOutput(result: ASTNode[], style: Output[] = ['nodePath', 'name', 'kind']) {
  return result.map(node =>
    arrayToObject(style, s => {
      if (s === 'nodePath') {
        return getASTNodePath(node)
      }
      else if (s === 'name') {
        return getASTNodeName(node)
      }
      else if (s === 'kind') {
        return getASTNodeKindName(node)
      }
      else if (s === 'text') {
        return getASTNodeText(node)
      }
      else if (s === 'filePath') {
        return getASTNodeFilePath(node)
      }
    })
  )
}

function printError(e: Error) {
  return `${e.name}, "${e.message}"\n  * ${(e.stack || '').split('\n').join('\n  * ')}`
}

function preconditions(options: Config) {
  if (options.output) {
    options.output = (options.output as any).split(',') as any
  }
  if (options.help) {
    printHelp();
    process.exit(0);
  }
  if (!options.query) {
    fail(`--query argument is mandatory and none was given. Aborting.`);
  }
  if (!options.files && !options.project) {
    fail(`One of --files or --project arguments is mandatory and none was given. Aborting.`);
  }
}

function fail(s: string) {
  console.error(s);
  process.exit(1);
}

function printHelp() {
  console.log(`
Usage: cannabis --query "//ClassDeclaration [@modifiers=~'export']" --files "src/**/foo/**/*.ts*" 

Options:

   * '--query': the query to search. It could be a query string or a text file with the query. 
   If a files exists it will be used, otherwise it assumes that is a query string. 
   Examples: '--query "//* [@name == 'foo']"', '--query ./queries/myLongQuery.txt'.

   * '--files': TypeScript files to search. Valid files are .ts, .tsx, .js, .jsx. 
   The value could be a glob pattern, in that case all files matching the pattern will be the input. 
   Examples: '--files "src/**/are42/**/*.ts?"'.

   * '--project': TypeScript project in which to search. It could be a folder or a 'tsconfig.json' 
   path. If '--files' also given it will be used as a filter pattern.

   * '--params': query parameters. It could be a json file containing an object or a literal json 
   text. Examples: '--params blackListWords.json', '--params '{"blackList": ["foo","bar"]}''

   * '--output': the output style. Valid values: 'nodePath', 'text', 'name', 'filePath', 'kind' 
   or a combination of any of them, comma separated. 

   * '--help': prints help and exits.

   * '--outputFile': If given the search result will be written in that file, otherwise will 
   be written in stdout.

   * '--outputCompress': if given JSON output will be minified.
   
   * '--outputCount': Just print the result count.

  `)
}

