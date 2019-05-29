async function testNode1(){
  const git = require('isomorphic-git');
  const fs = require('fs');
  const files = await git.listFiles({fs, dir: __dirname});
  console.log(files)
}
testNode1()