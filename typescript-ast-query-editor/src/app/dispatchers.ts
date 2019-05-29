import { getStore } from './store';
import { inspect } from 'util';

export function debug(...args: any[]){
  getStore().getState().logs.push(args.map(a=>inspect(a)).join(' '))
}