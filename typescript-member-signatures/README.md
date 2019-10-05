# typescript-member-signatures

Command line tool to extract TypeScript interface members metadata. 

Recurse on all super interfaces.

Useful to generate documentation automatically or when reflection over interfaces (like options) is needed. 

Supports jsdoc descriptions as markdown. 

Supports TypeScript output exporting member metadata as typed variable.

## Contents

<!-- toc -->

- [Install](#install)
- [Command line syntax](#command-line-syntax)
- [Javascript API](#javascript-api)
- [Options](#options)
- [About --target glob format](#about---target-glob-format)
- [TODO](#todo)

<!-- tocstop -->

## Install

```sh
npm install typescript-member-signatures
```

## Command line syntax

The following command generates signatures of all interfaces named Options in current TypeScript project. See Options section for details.

```sh
typescript-member-signatures --target "**/Options" --output options.json
```

List all interfaces existing in current project and their paths so we can easily call the tool again to extract their signatures with --target: 

```
typescript-member-signatures --listInterfaces
```

Prints markdown formatted text (not json) of interface with path `src/types/Options` of project located at `../another-project/tsconfig.json`: 

```
typescript-member-signatures --project ../another-project/tsconfig.json --target src/types/Options --generateMarkdownDocs 
```

## Javascript API

```ts
import { extractMemberSignatures } from 'typescript-member-signatures 

let results = extractMemberSignatures({ 
  project: 'test/assets/project1/tsconfig.json', 
  target: '**/test1/G'
})

// or give interface declarations directly (you need to use ts-morph)
let results = extractMemberSignatures({ 
  project: 'test/assets/project1/tsconfig.json', 
  target: '**/test1/G'
})
```

## Options
 
 * `--project?: string`: TypeScript project in which to search the target interface, must point to a tsconfig.json file.
 * `--target: string`: Glob pattern pointing to the target interface. Example: "** /area44/** /services/** /LoginService".
 * `--output?: string`: If given the result will be written to this file, if not to stdout.
 * `--files?: string`: Extract from these files. If project is also provided, add this extra files to it.
Can be a file name or a glob pattern.
 * `--typescriptOutput?: string` : Generate TypeScript code instead of JSON that exports a typed variable with given name or inferred from interface otherwise. 
 * `--ignoreMemberWithUnderscorePrefix?: boolean`: Will ignore members which names start with '_'
 * `--onlySignature?: boolean`: Return only the signatures, don't generate jsdocsText, etc. only name and signature.
 * `--generateMarkdownDocs?: boolean`: Will generate markdown text for the interface and its members suitable to include in README.md API section.
 * `--help?: boolean`:
 * `--debug?: boolean`:
 * `--listInterfaces?: boolean`: If given prints found interfaces and their paths to stdout and exit. If target is given prints interfaces only on matched files/dirs, if none given prints all interfaces in project.

## About --target glob format

At first, it is equivalent to any glob pattern, matching folders and files. But the lasts nodes of the path are actually the names of interfaces we want to extract the signatures from.

For example `**/*foo*/**/*bar/I*Model` matches Interfaces which name start with `I` and ends with `Model`, which SourceFile base name ends with bar (could be bar.ts or bar.tsx, etc) and has some ascendant directory which name contains `foo`.

## TODO

- [ ] "--typescriptOutput options" TypeScript file with types instead of json `export const options: MemberSignatures = [...]`
- [ ] --javaScriptOutput generates a .js file exporting the values `export [...]` instead of json
- [ ] --target with cannabis is complicated. Support "--targetName AnInterface". If there are several interfaces with that name extrat types of them all or optionally support --targetFile to declare from which files
- [ ] option generateCliHelpDocs option.
- [ ] options printMarkdownDocsOnly and printCliHelpDocsOnly so only md or cli docs text is output as string
- [ ] CLi options in --help.
- [ ] issue: failing with interface + type arguments
- [x] make --project optional and if not given is current folder tsconfig.json
- [x] when interface not found display proper error
- [x] --listInterfaces