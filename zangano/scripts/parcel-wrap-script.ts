import { execSync } from 'child_process';
import { rmdirSync, writeFileSync, existsSync } from 'fs';
import { objectFilter } from 'misc-utils-of-mine-generic';
import { dirname, join, basename } from 'path';

const a = require('yargs-parser')(process.argv.slice(2)) as { [k: string]: string}&{ _: string[] }
const args = a['_']
if(args.length<1){
  throw new Error('no input files were passed, exiting.')
}
const file = args[0]
if(!existsSync(file)){
  throw new Error('Target file does not exist '+file)
}

console.log(args);

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

const s = execSync(`parcel serve ${htmlFile} ${args.slice(1).join(' ')}`)
// if(s!==0){
//   throw new Errpr
// }

// execSync(`npx parcel serve "${htmlFile}" ${args.slice(1).join(' ')}`)


// var fs = require("fs");
// var path = require("path");

// var rmdir = function(dir) {
// 	var list = fs.readdirSync(dir);
// 	for(var i = 0; i < list.length; i++) {
// 		var filename = path.join(dir, list[i]);
// 		var stat = fs.statSync(filename);
		
// 		if(filename == "." || filename == "..") {
// 			// pass these files
// 		} else if(stat.isDirectory()) {
// 			// rmdir recursively
// 			rmdir(filename);
// 		} else {
// 			// rm fiilename
// 			fs.unlinkSync(filename);
// 		}
// 	}
// 	fs.rmdirSync(dir);
// };