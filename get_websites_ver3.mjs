import { BasicCrawler, Dataset, JSDOMCrawler } from 'crawlee';

const crawler = new BasicCrawler({
  async requestHandler({ request, log, skipLinks }) {
    const { url } = request;

    log.info(`Processing ${url}...`);

    let body;
    
    const loaded = request.loadedRequest;
    if (loaded) {
      body = loaded.body; 
    }
    
    if (!body) {
      log.warning('Request failed to load, skipping', { url });
      return;
    }

    // Parse and extract links
    const dom = await JSDOMCrawler.parse(body);
    const links = dom.querySelectorAll('a[href]').map(a => a.href);
    
    // Enqueue links
    for(const link of links) {
      await skipLinks(link);
    }

    // Save data
    await Dataset.pushData({ url, html: body });
  },
});

await crawler.addRequests([
  "https://example.com" 
]);

await crawler.run();