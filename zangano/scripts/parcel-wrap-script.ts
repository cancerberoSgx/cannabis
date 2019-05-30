// run it like  ts-node parcel-wrap-script.ts src/another/script.js 
// it will creqte a html that loads that script and run parcel server  src/another/script.js 
import { execSync } from 'child_process';
import { existsSync, writeFileSync } from 'fs';
import { basename, dirname, join } from 'path';

const a = require('yargs-parser')(process.argv.slice(2)) as { [k: string]: string}&{ _: string[] }
const args = a['_']
if(args.length<1){
  throw new Error('no input files were passed, exiting.')
}
const file = args[0]
if(!existsSync(file)){
  throw new Error('Target file does not exist '+file)
}

const htmlFile = join(dirname(file), basename(file))+'.html'
writeFileSync(htmlFile, `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>${basename(file)}</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
</head>
<body>
  <script src="${basename(file)}"></script>
</body>
</html>
`.trim())

const s = execSync(`parcel serve ${htmlFile} ${args.slice(1).join(' ')}`, {stdio: 'inherit'})