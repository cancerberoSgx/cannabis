export interface Options {
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
   * Return only the signatures, don't generate names, jsdocs comment text, etc
   */
  onlySignature?: boolean
  help?: boolean
}

export interface Result {
  name: string
  signature: string
  methods?: Member[]
  properties?: Member[]
}

interface Member {
  signature: string
  name?: string
  jsDocsText?: string
}