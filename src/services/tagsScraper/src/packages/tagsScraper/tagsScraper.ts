import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
import { Browser, executablePath } from "puppeteer";
import { CheerioAPI, load } from "cheerio";
import { logger } from "../../logger";

puppeteer.use(StealthPlugin());

export const scrape = async (): Promise<Array<object>> => {
	const data: Array<object> = [];

	try {
		const content = await getPageContent("https://leetcode.com/problemset/all/");
		const $: CheerioAPI = load(content);
		$("div.group > a.items-center").each((i, elm) => {
			const spans = $(elm).children();

			data.push({
				name: $(spans[0]).text(),
				slug: $(elm).attr("href")?.split("/")[2],
				numberOfProblems: parseInt($(spans[1]).text())
			});
		});
	} catch(e) {
		throw new Error("Error scraping tags from leetcode: " + e);
	}

	return data;
};

const startBrowser = async (): Promise<Browser> => {
	let browser: Browser;

	try {
		browser = await puppeteer.launch({
			args: [
				"--no-sandbox",
			],
			headless: false,
			ignoreHTTPSErrors: true,
			executablePath: executablePath()
		});
	} catch(e) {
		logger.error("Could not create a new browser instance: " + e);
		throw e;
	}

	return browser;
};

const getPageContent = async (url: string): Promise<string> => {
	let content: string;

	try {
		const browser = await startBrowser();
		const [page] = await browser.pages();

		await page.goto(url, { waitUntil: "networkidle2" });
		content = await page.content();
		await browser.close();
	} catch(e) {
		logger.error("Could not fetch page contents from leetcode.com: " + e);
		throw e;
	}

	return content;
};
