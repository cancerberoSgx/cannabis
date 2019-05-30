import test, {ExecutionContext} from 'ava'
import puppeteer, { Page }  from 'puppeteer';

export default async function withPage(t: ExecutionContext, run: (t: ExecutionContext,page: Page)=>Promise<any>) {
	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	try {
		await run(t, page);
	} finally {
		await page.close();
		await browser.close();
	}
}