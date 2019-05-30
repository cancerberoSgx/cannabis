// import { JSDOM } from 'jsdom';

// export function prepareIndexDb() {
//   require("fake-indexeddb/auto");
//   const dom = new JSDOM('<html><head><head><body></body></html>', {
//     url: 'http://localhost/',
//     runScripts: 'dangerously',
//     resources: 'usable',
//   });
//   const g = global as any;
//   g.document = dom.window.document;
//   g.window = dom.window;
//   g.navigator = dom.window.navigator;
// }

// prepareIndexDb()