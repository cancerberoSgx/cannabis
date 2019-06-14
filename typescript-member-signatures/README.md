Extract TypeScript interface members (recurse on its super interfaces)

## Install

```sh
npm install typescript-member-signatures
```

## Command line syntax

The following command generates signatures and markdown text of all interfaces named Options in current TypeScript project. See Options section for details.

```sh
typescript-member-signatures --project tsconfig.json  --target "**/Options" --generateMarkdownDocs --output options.json
```

## Javascript API

```ts
import { extractMemberSignatures } from 'typescript-member-signatures 

let results = extractMemberSignatures({ 
  project: 'test/assets/project1/tsconfig.json', 
  target: '**/test1/G'
})
```

## Options

 * `project?: string`: TypeScript project in which to search the target interface, must point to a tsconfig.json file.
 * `target: string`: Glob pattern pointing to the target interface. Example: \"** /area44/** /services/** /LoginService\".
 * `output?: string`: If given the result will be written to this file, if not to stdout.
 * `files?: string`: Extract from these files. If project is also provided, add this extra files to it. 
 an be a file name or a glob pattern.
 * `ignoreMemberWithUnderscorePrefix?: boolean`: Will ignore members which names start with '_'
 * `onlySignature?: boolean`: Return only the signatures, don't generate jsdocsText, etc. only name and signature.
 * `generateMarkdownDocs?: boolean`: Will generate markdown text for the interface and its members suitable to include in README.md API section.
 * `help?: boolean`

## Examples

Will generate signatures and markdown text of all interfaces named Options in current TypeScript project.

```sh
typescript-member-signatures --project tsconfig.json  --target "**/Options" --generateMarkdownDocs --output options.json
```

TODO: more examples

## TODO: 

 [ ] option generateCliHelpDocs option.
 [ ] options printMarkdownDocsOnly and printCliHelpDocsOnly so only md or cli docs text is output as string
 [ ] CLi options in --help.