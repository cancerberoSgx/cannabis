import { FileSystemHost } from 'ts-morph'
import { initPsmDir } from '../browser/util'
import { visit } from '../browser/visit'


export async function importDirectoryFromBrowserDir(dir: string, fs: FileSystemHost) {
  const pfs = await initPsmDir(dir)
  await visit(pfs, dir, f => {
    // console.log(f.path, f.type, f.content && f.content.length)
    if (f.content && f.path) {

      const p = f.path.substring(dir.length)
      console.log('**** WWWW Writing file', p, typeof f.content, f.content.length, f.type)

      fs.writeFileSync(p, f.content)
    }
    // else if(f.type==='directory'){
    //   fs.mkdirSync(f.path)
    // }
    return false
  })
}
