import { initPsmDir } from '../browser/util';
import { visit } from '../browser/visit';
import { FileSystemHost } from 'ts-morph';

export async function importDirectory(dir: string, fs: FileSystemHost){
  const pfs = await initPsmDir(dir)
  await visit(pfs, dir, f => {
    console.log(f.path, f.type, f.content && f.content.length)
    if(f.content && f.type==='file'){
      fs.writeFileSync(f.path, f.content)
    }
    else if(f.type==='directory'){
      fs.mkdirSync(f.path)
    }
    return false
  })
}