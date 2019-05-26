import * as ts from 'typescript'

/** get the kind name as string of given kind value or node */
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

/**
 * Return immediate children of given node.
 * @param getChildrenMode if true it will use `node.getChildren()` o obtain children instead of default
 * behavior that is using `node.forEachChild`.
 */
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
