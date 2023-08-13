// You don't need to import RequestQueue anymore
import { CheerioCrawler } from 'crawlee';

const crawler = new CheerioCrawler({
    async requestHandler({ $, request }) {
        const title = $('title').text();
        console.log(`The title of "${request.url}" is: ${title}.`);
    }
})

// Start the crawler with the provided URLs
await crawler.run(['https://example.com']) // (['https://crawlee.dev']);