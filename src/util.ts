let _unique: number = 0
export function unique(prefix: string = '_'): string {
  return prefix + _unique++
}