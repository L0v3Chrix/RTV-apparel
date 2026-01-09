import {createRequestHandler} from '@shopify/remix-oxygen';

// Dynamic import to support the build output
const getBuild = async () => {
  const build = await import('./dist/server/index.js');
  return build;
};

export default async function handler(request, response) {
  try {
    const build = await getBuild();

    // Create load context with environment variables
    const getLoadContext = () => ({
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
    });

    const handleRequest = createRequestHandler({
      build,
      mode: process.env.NODE_ENV || 'production',
      getLoadContext,
    });

    // Build Web API Request from Node.js request
    const protocol = request.headers['x-forwarded-proto'] || 'https';
    const host = request.headers['x-forwarded-host'] || request.headers.host;
    const url = new URL(request.url, `${protocol}://${host}`);

    const headers = new Headers();
    for (const [key, value] of Object.entries(request.headers)) {
      if (value) {
        if (Array.isArray(value)) {
          value.forEach((v) => headers.append(key, v));
        } else {
          headers.set(key, value);
        }
      }
    }

    // Collect request body
    let body = null;
    if (request.method !== 'GET' && request.method !== 'HEAD') {
      const chunks = [];
      for await (const chunk of request) {
        chunks.push(chunk);
      }
      body = Buffer.concat(chunks);
    }

    const webRequest = new Request(url.toString(), {
      method: request.method,
      headers,
      body,
      duplex: 'half',
    });

    // Get response from Remix handler
    const webResponse = await handleRequest(webRequest);

    // Set response status
    response.statusCode = webResponse.status;
    response.statusMessage = webResponse.statusText;

    // Set response headers
    for (const [key, value] of webResponse.headers.entries()) {
      response.setHeader(key, value);
    }

    // Stream response body
    if (webResponse.body) {
      const reader = webResponse.body.getReader();
      const pump = async () => {
        while (true) {
          const {done, value} = await reader.read();
          if (done) {
            response.end();
            break;
          }
          response.write(value);
        }
      };
      await pump();
    } else {
      const text = await webResponse.text();
      response.end(text);
    }
  } catch (error) {
    console.error('Server error:', error);
    response.statusCode = 500;
    response.end('Internal Server Error');
  }
}
