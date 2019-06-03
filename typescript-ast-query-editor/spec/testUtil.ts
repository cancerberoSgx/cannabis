import { execSync, spawnSync } from 'child_process';
import { sleep } from 'misc-utils-of-mine-generic';

import { appendFileSync } from 'fs';
// import { rm } from 'shelljs';
import { format } from 'util';

async function startServer(){
  execSync('killall node')
  execSync('npm run build-dev')
  spawnSync('npx http-server docs')
  await sleep(1500)
}

async function startJasmine() {
  const argv = process.argv.slice(2)
  const configFile = argv.shift()
  // rm('-rf', 'test_output.txt')
  let Jasmine = require('jasmine')
  // @ts-ignore
  let j = new Jasmine()
  j.loadConfigFile(configFile || 'spec/support/jasmine.json')
  
  j.configureDefaultReporter({
    print: function(...args: any[]) {
      appendFileSync(
        'test_output.txt',
        'print: ' +
        args
          .map(a => {
            return format.apply(this, args as any)
            // if (a instanceof Error) {
            //   return `${a}\n${a && a.stack && (a.stack || '').split('\n').join('\n')}`
            // }
            // else if (isString(a)){
            //   return a
            // }
            // else {
            //   return inspect(a)
            // }
          })
          .join(', ')
      )
      process.stdout.write(format.apply(this, arguments as any))
    }
  })
  
  // j.onComplete(function(passed: boolean) {
  //   console.log('RESULT FILE WAS WRITTEN TO test_output.txt', arguments)
  //   if (passed) {
  //     console.log('All specs have passed')
  //     process.exit(0)
  //   } else {
  //     console.log('At least one spec has failed')
  //     process.exit(1)
  //   }
  // })
  
  // jasmine.getEnv().clearReporters()
  // jasmine.getEnv().addReporter(new SpecReporter({
  //   customProcessors: [CustomProcessor]
  // }))
  
  j.execute()
  
}


startServer()