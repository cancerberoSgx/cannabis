import { inspect } from 'util'
import { getStore } from './store'

export function debug(...args: any[]) {
  getStore().getState().logs.push(args.map(a => inspect(a)).join(' '))
}
