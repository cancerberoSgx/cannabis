import { FileSystemHost, Project } from 'ts-morph'

interface VirtualFileSystemHostConstructor {
  new(): FileSystemHost
}

export const VirtualFileSystemHostConstructor: VirtualFileSystemHostConstructor = null as any as VirtualFileSystemHostConstructor

module.exports.VirtualFileSystemHostConstructor = getFileSystemHostConstructor().constructor

function getFileSystemHostConstructor() {
  const p = new Project({ useVirtualFileSystem: true })
  const fs = p.getFileSystem()
  return fs
}

