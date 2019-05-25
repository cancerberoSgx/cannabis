import * as ts from 'typescript'

export function getKindName(kind: number | ts.Node): string {
  return (kind || kind === 0) ? getEnumKey(ts.SyntaxKind, (kind as ts.Node).kind || kind) : 'undefined';
}
function getEnumKey(anEnum: any, value: any): string {
  for (const key in anEnum) {
    if (value === anEnum[key]) {
      return key;
    }
  }
  return '';
}
export function getChildren(node: ts.Node | undefined, getChildrenMode: boolean = false): ts.Node[] {
  if (!node) {
    return [];
  }
  if (getChildrenMode) {
    return node.getChildren();
  }
  const result: ts.Node[] = [];
  node.forEachChild(c => {
    result.push(c);
  });
  return result;
}
