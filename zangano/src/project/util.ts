import { Node } from 'ts-morph'

export function getType(v: Node) {
  return v.getType().getApparentType().getText() || v.getType().getText || ''
}
