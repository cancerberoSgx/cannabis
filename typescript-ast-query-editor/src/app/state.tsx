import { ASTQQuery, ASTYNode, queryAst, tsMorph } from 'cannabis'
import { getFile } from 'cannabis/dist/src/file'
import { codeExamples, Example, examples } from "./examples"

export interface State {
  selectedExample: Example;
  currentEditorAst: tsMorph.SourceFile;
  astAutoUpdate: boolean;
  queryDump: string;
  logs: string[];
  result: tsMorph.Node<tsMorph.ts.Node>[];
  error?: Error | undefined;
  examples: Example[];
  nodeAtPosition: tsMorph.Node<tsMorph.ts.Node> | undefined;
  sidebarVisibility: boolean;
  query: ASTQQuery;
  queryAst: ASTYNode;
  getChildren: boolean;
  // currentTabIndex: number
  astShowText: boolean;
  queryLogs: string[]
  queryNodeAtPosition: ASTYNode | undefined;
}

export function getInitialState() {
  const selectedExample = examples[0]
  const selectedExampleCode = codeExamples.find(c => c.name === selectedExample.code) && codeExamples.find(c => c.name === selectedExample.code)!.content || codeExamples[0].content
  const r = queryAst(selectedExample.query, selectedExampleCode)
  return {
    selectedExample,
    astAutoUpdate: false,
    // currentTabIndex: 0,
    currentEditorAst: getFile(selectedExampleCode) as tsMorph.SourceFile,
    result: [], examples,
    logs: [],
    nodeAtPosition: undefined,
    queryDump: r.query && r.query.dump() || '',
    sidebarVisibility: false,
    query: r.query!,
    queryLogs: [],
    queryAst: r.query!.ast,
    getChildren: false,
    astShowText: true,
    queryNodeAtPosition: undefined
  }
}
