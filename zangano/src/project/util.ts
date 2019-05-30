import { Node } from 'ts-morph'
let util
export function getType(v: Node) {
  return v.getType().getApparentType().getText() || v.getType().getText || ''
}
