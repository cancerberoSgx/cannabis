Command line interface for [cannabis](..), the TypeScript advanced AST Query library

## Install

```sh
npm install -g cannabis-cli
```

## Syntax

```sh
cannabis --query "//* [@name == 'foo']" --files "src/**/are42/**/*.ts?"
```

## Options

 * `--query`: the query to search. It could be a query string or a text file with the query. If a files exists it will be used, otherwise it assumes that is a query string. Examples: `--query "//* [@name == 'foo']"`, `--query ./queries/myLongQuery.txt`.
 * `--files`: TypeScript files to search. Valid files are .ts, .tsx, .js, .jsx. The value could be a glob pattern, in that case all files matching the pattern will be the input. Examples: `--files "src/**/are42/**/*.ts?"`.
 * `--project`: TypeScript project in which to search. It could be a folder or a `tsconfig.json` path. If `--files` also given it will be used as a filter pattern.
 * `--params`: query parameters. It could be a json file containing an object or a literal json text. Examples: `--params blackListWords.json`, `--params '{"blackList": ["foo","bar"]}'`
 * `--output`: the output style. Valid values: `nodePath`, `text`, `name`, `filePath`, `kind` or a combination of any of them, comma separated. 
 * `--help`: prints help and exits.
 * `--outputFile`: If given the search result will be written in that file, otherwise will be written in stdout.
 * `--one`: If given will stop searching when a node matches so result will be at most 1 node. Otherwise it will search on every file and all matching nodes will be returned.
 
## Examples

Give a query as argument and search it across files that match given glob pattern:

```sh
cannabis --query "//* [@name == 'foo']" --files "src/**/are42/**/*.ts?"
```

Give a query from a file and search it across files of given project

```sh
cannabis --query "./queries/myLongQuery.txt" --project ../git/project1/tsconfig.json
```

Search given query in all files of current folder's TypeScript project:

```sh
cannabis --query "//* [@name == 'foo']" --project .
```

Search given query in current folder's project, filtering files using given pattern in `--files` argument, and using query parameters from given file's text:

```sh
cannabis --query "[//* containsAnyOf(@name, {blackList}]" --project . --files "**/area44/**/*" --params blackListWords.json
```

Same as before, but passing parameters literally in the argument:

```sh
cannabis --query "[//* containsAnyOf(@name, {blackList}]" --project . --files "**/area44/**/*" --params '{"blackList": ["foo","bar"]}'
```

Listing only name and kind of matches using --output:

```sh
cannabis --query "// Identifier [..//InterfaceDeclaration]" --project . --output "name,kind"
```



## TODO: 

 --timings
 --trace
 --logs to write query logs.