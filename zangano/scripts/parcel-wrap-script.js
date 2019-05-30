"use strict";
exports.__esModule = true;
// run it like  ts-node parcel-wrap-script.ts src/another/script.js 
// it will creqte a html that loads that script and run parcel server  src/another/script.js 
var child_process_1 = require("child_process");
var fs_1 = require("fs");
var path_1 = require("path");
var a = require('yargs-parser')(process.argv.slice(2));
var args = a['_'];
if (args.length < 1) {
    throw new Error('no input files were passed, exiting.');
}
var file = args[0];
if (!fs_1.existsSync(file)) {
    throw new Error('Target file does not exist ' + file);
}
var htmlFile = path_1.join(path_1.dirname(file), path_1.basename(file)) + '.html';
fs_1.writeFileSync(htmlFile, ("\n<!DOCTYPE html>\n<html>\n<head>\n  <meta charset=\"utf-8\">\n  <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\">\n  <title>" + path_1.basename(file) + "</title>\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n</head>\n<body>\n  <script src=\"" + path_1.basename(file) + "\"></script>\n</body>\n</html>\n").trim());
var s = child_process_1.execSync("parcel serve " + htmlFile + " " + args.slice(1).join(' '), { stdio: 'inherit' });
