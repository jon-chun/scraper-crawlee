import { BasicCrawler, purgeDefaultStorages, Dataset, JSDOMCrawler } from 'crawlee';

await purgeDefaultStorages(); 

const crawler = new BasicCrawler({
  async requestHandler({ request, log, skipLinks }) {
    const { url } = request;

    log.info(`Processing ${url}...`);
    
    // Fetch page HTML
    const { body } = await request.send();
    
    // Parse HTML with JSDOM
    const dom = await JSDOMCrawler.parse(body);
    
    // Extract links from page
    const links = dom.querySelectorAll('a[href]').map(a => a.href);
    
    // Enqueue links for crawling 
    for(const link of links) {
      await skipLinks(link); 
    }

    // Save page data
    await Dataset.pushData({ url, html: body });
  },

  maxRequestsPerCrawl: 100,
});

// Initial URLs
await crawler.addRequests([
  "https://example.com",
  "https://example2.com" 
]);

await crawler.run();

console.log('Crawler finished!');