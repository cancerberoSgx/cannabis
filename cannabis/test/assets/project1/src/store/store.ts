import { State } from './state';

export interface Store {
  getState():State
  
}

export function getStore(){
  return null as Store
}
