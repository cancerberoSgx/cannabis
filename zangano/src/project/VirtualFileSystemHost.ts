import {Project, FileSystemHost} from 'ts-morph';

interface VirtualFileSystemHostConstructor {
  new():FileSystemHost
}

export const VirtualFileSystemHostConstructor:VirtualFileSystemHostConstructor =  null as any as VirtualFileSystemHostConstructor

module.exports.VirtualFileSystemHostConstructor = getFileSystemHostConstructor().constructor

// const fs = getFileSystemHostConstructor();
function getFileSystemHostConstructor() {
  const p = new Project({ useVirtualFileSystem: true });
  const fs = p.getFileSystem();
  // console.log(fs.constructor);
  return fs;
}

