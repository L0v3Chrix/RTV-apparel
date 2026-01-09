import {createRequestHandler} from '@shopify/remix-oxygen';
import build from '../dist/server/index.js';

const handleRequest = createRequestHandler({
  build,
  mode: process.env.NODE_ENV || 'production',
  getLoadContext: () => ({
    env: {
      SESSION_SECRET: process.env.SESSION_SECRET || 'foobar',
      PUBLIC_STOREFRONT_API_TOKEN: process.env.PUBLIC_STOREFRONT_API_TOKEN,
      PRIVATE_STOREFRONT_API_TOKEN: process.env.PRIVATE_STOREFRONT_API_TOKEN,
      PUBLIC_STORE_DOMAIN: process.env.PUBLIC_STORE_DOMAIN,
      PUBLIC_STOREFRONT_ID: process.env.PUBLIC_STOREFRONT_ID,
      PUBLIC_CUSTOMER_ACCOUNT_API_CLIENT_ID:
        process.env.PUBLIC_CUSTOMER_ACCOUNT_API_CLIENT_ID,
      PUBLIC_CUSTOMER_ACCOUNT_API_URL:
        process.env.PUBLIC_CUSTOMER_ACCOUNT_API_URL,
      PUBLIC_CHECKOUT_DOMAIN: process.env.PUBLIC_CHECKOUT_DOMAIN,
    },
    waitUntil: () => Promise.resolve(),
  }),
});

export default async function handler(req, res) {
  try {
    // Build Web API Request from Node.js request
    const protocol = req.headers['x-forwarded-proto'] || 'https';
    const host = req.headers['x-forwarded-host'] || req.headers.host;
    const url = new URL(req.url, `${protocol}://${host}`);

    const headers = new Headers();
    for (const [key, value] of Object.entries(req.headers)) {
      if (value) {
        if (Array.isArray(value)) {
          value.forEach((v) => headers.append(key, v));
        } else {
          headers.set(key, value);
        }
      }
    }

    // Collect request body for non-GET requests
    let body = null;
    if (req.method !== 'GET' && req.method !== 'HEAD') {
      const chunks = [];
      for await (const chunk of req) {
        chunks.push(chunk);
      }
      if (chunks.length > 0) {
        body = Buffer.concat(chunks);
      }
    }

    const webRequest = new Request(url.toString(), {
      method: req.method,
      headers,
      body,
      duplex: 'half',
    });

    // Get response from Remix handler
    const webResponse = await handleRequest(webRequest);

    // Set response status
    res.statusCode = webResponse.status;

    // Set response headers
    for (const [key, value] of webResponse.headers.entries()) {
      res.setHeader(key, value);
    }

    // Stream response body
    if (webResponse.body) {
      const reader = webResponse.body.getReader();
      while (true) {
        const {done, value} = await reader.read();
        if (done) break;
        res.write(value);
      }
      res.end();
    } else {
      const text = await webResponse.text();
      res.end(text);
    }
  } catch (error) {
    console.error('Server error:', error);
    res.statusCode = 500;
    res.end('Internal Server Error');
  }
}
