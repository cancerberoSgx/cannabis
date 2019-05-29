node.js and browser JavaScript library with easy to use API to load a TypeScript projects from git repositories, ready to be used by Compiler API, with full LanguageService and TypeChecker, read/write support.


## Motivation

 * I have several apps that consume a TypeScript project to perform manipulation/queries on the AST files and I need to have a easy / standard way of representing and acess a TypeScript project in the browser too, with the same API I would do in node.js.

## Initial Implementation

  * load a git project in browser using  https://isomorphic-git.org/docs/en/fs 
  * implement ts-morph or TypeScript FileSystemHost based on FS implementation used for previous point (BrowserFs, lightning-fs)
  * add missing Type libraries to the project, mandatory typescript/libs.d.ts . Since we cannot perform npm install we need to do it by hand.
  * after this we should be able to create a ts-morph project that resolve all types and have correct TypeCheking.
