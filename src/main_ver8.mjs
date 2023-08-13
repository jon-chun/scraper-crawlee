import { BasicCrawler, Dataset } from 'crawlee';

// Create a BasicCrawler - the simplest crawler that enables
// users to implement the crawling logic themselves.
const crawler = new BasicCrawler({
    // This function will be called for each URL to crawl.
    async requestHandler({ request, sendRequest, log }) {
        const { url } = request;
        log.info(`Processing ${url}...`);

        // Fetch the page HTML via the crawlee sendRequest utility method
        // By default, the method will use the current request that is being handled, so you don't have to
        // provide it yourself. You can also provide a custom request if you want.
        const { body } = await sendRequest();

        // Store the HTML and URL to the default dataset.
        await Dataset.pushData({
            url,
            html: body,
        });
    },
});

// The initial list of URLs to crawl. Here we use just a few hard-coded URLs.
await crawler.addRequests([
    "https://www.riversiderecovery.rehab/",
    "https://freedomctr.net/",
    "https://www.bhcpartners.org/services",
    "https://www.questrecoverycenter.com/",
    "https://www.knoxhealth.com/",
    "https://ohio.gov/residents/resources/ohio-careline",
    "https://naloxone.ohio.gov/",
    "https://mha.ohio.gov/community-partners/employment/employment",
    "https://mha.ohio.gov/community-partners/peer-supporters/peer-supporters",
    "https://www.samhsa.gov/find-help/national-helpline",
    "https://www.samhsa.gov/find-support/helping-someone/how-to-talk-to-someone-about-help",
    "https://www.samhsa.gov/find-support/how-to-pay-for-treatment/free-or-low-cost-treatment",
    "https://www.samhsa.gov/find-support/how-to-pay-for-treatment/know-what-your-insurance-covers",
    "https://www.samhsa.gov/find-support/learn-about-treatment/types-of-treatment",
    "https://www.samhsa.gov/find-support/health-care-or-support"
]);

// Run the crawler and wait for it to finish.
await crawler.run();

console.log('Crawler finished.');