import { clone, createBrowserProjectFromDirectory } from 'zangano'
import { getStore, GitProject } from './store'

export async function importGitProject() {
    getStore().setState({ error: undefined, status: 'git clone' })
  const url = getStore().getState().gitUrlInput
  try {
    const { dir } = await clone({
      corsProxy: 'https://cors.isomorphic-git.org',
      url,
      ref: 'master',
      singleBranch: true,
      depth: 10
    })
    const project = await createBrowserProjectFromDirectory({ dir })
    // console.log(project.getSourceFiles().map(f => f.getBaseName()), project.getDirectories().map(d => d.getPath()), project.getRootDirectories().map(d => d.getPath()))
    const packageJson = JSON.parse(project.getFileSystem().readFileSync('package.json'))
    const gitProject = { project, gitUrl: url, baseFolder: dir, packageJson }
    getStore().setState({
      projects: [...getStore().getState().projects, gitProject],
      currentProject: gitProject,
      currentSourceFile: gitProject.project.getSourceFiles()[0]
    })

    getStore().setState({ error: undefined })
  } catch (error) {
    getStore().setState({ error })
  }
  getStore().setState({ status: undefined })

}



export function selectProject(gitProject: GitProject){
  getStore().setState({
    currentProject: gitProject,
    currentSourceFile: gitProject.project.getSourceFiles()[0]
  })
  getStore().setState({ error: undefined })
  getStore().setState({ status: undefined })
}