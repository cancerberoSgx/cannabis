import { main } from './main';

main().catch(error => {
  console.error('Error: ' + error)
  error.stack && console.log(error.stack.split('\n').join('\n'))
  process.exit(1)
})
