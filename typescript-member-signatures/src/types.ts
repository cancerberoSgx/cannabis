import { InterfaceDeclaration } from 'ts-morph'

export interface Options {

  /**
   * If given, instead of JSON it will generate TypeScript file exporting a typed variable with given name if a string is given.
   */
  typescriptOutput?: string | true;

  /**
   * TypeScript project in which to search the target interface, must point to a tsconfig.json file.
   */
  project?: string

  /**
   * Glob pattern pointing to the target interface. Example: "** /area44/** /services/** /LoginService".
   */
  target: string

  /**
   * If given the result will be written to this file, if not to stdout.
   */
  output?: string

  /**
   * Extract from these files. If project is also provided, add this extra files to it. 
   * Can be a file name or a glob pattern.
   */
  files?: string

  /**
   * Will ignore members which names start with '_'
   */
  ignoreMemberWithUnderscorePrefix?: boolean

  /**
   * Return only the signatures, don't generate jsdocsText, etc. only name and signature.
   */
  onlySignature?: boolean

  /**
   * Will generate markdown text for the interface and its members suitable to include in README.md API section.
   */
  generateMarkdownDocs?: boolean

  help?: boolean

  debug?: boolean

  /**
   * If given prints found interfaces and their paths to stdout and exit. If target is given prints interfaces only on matched files/dirs, if none given prints all interfaces in project.
   */
  listInterfaces?: boolean

  /**
   * (JavaScript API only). If given, [target] is ignored and the signatures of these declarations are extracted. 
   */
  declarations?: InterfaceDeclaration[]
}

export interface Result {
  name: string
  signature: string
  methods?: Member[]
  properties?: Member[]
  markdown?: string
}

export interface Member {
  signature: string
  name?: string
  typeText?: string
  jsDocsText?: string
  optional?: boolean
  markdown?: string
}
