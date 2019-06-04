import { execSync } from 'child_process';

function getCurrentCommit() {
  return execSync('git rev-parse --short HEAD')
    .toString()
    .trim()
}

export function getPerformanceFileName(label: string) {
  return nowFormat().replace(/:/g, '_') + '_' + getCurrentCommit() + '_' + label + '.json'
}

function nowFormat() {
  const d = new Date()
 return d.getFullYear()+'-'+(d.getMonth()+'').padStart(2,'0')+'-'+(d.getDay()+'').padStart(2,'0')+'-'+(d.getHours()+'').padStart(2,'0')+':'+(d.getMinutes()+'').padStart(2,'0')+':'+(d.getSeconds()+'').padStart(2,'0')
}