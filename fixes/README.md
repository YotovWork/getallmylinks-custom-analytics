# Fix for Chromium Path Issue in Netlify Function

This guide contains instructions to fix the error: `Error: The input directory "/var/task/netlify/bin" does not exist.`

## 1. Update netlify.toml

Edit your `netlify.toml` file to include the following configuration:

```toml
[build]
  publish = "static-analytics"
  functions = "netlify/functions"

[functions]
  node_bundler = "esbuild"
  included_files = ["node_modules/@sparticuz/chromium/lib/**"]
  
[functions.getAnalyticsData]
  timeout = 60

[dev]
  publish = "static-analytics"
  functions = "netlify/functions"
  
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

The key changes are:
- Added `included_files` to include Chromium files
- Added a `timeout` of 60 seconds for the function (default is 26 seconds)

## 2. Update getAnalyticsData.js

In your `netlify/functions/getAnalyticsData.js` file, update the browser launch configuration:

```javascript
browser = await puppeteer.launch({
  args: chromium.args,
  defaultViewport: chromium.defaultViewport,
  executablePath: await chromium.executablePath(),
  headless: chromium.headless,
});
```

Replace your current configuration with this simplified version that properly uses the @sparticuz/chromium package.

## 3. Commit and Push Changes

After making these changes, commit and push them to GitHub:

```bash
git add netlify.toml netlify/functions/getAnalyticsData.js
git commit -m "Fix Chromium path issue in Netlify function"
git push
```

## 4. Deploy on Netlify

After pushing to GitHub:
1. Go to Netlify dashboard
2. Navigate to Deploys
3. Click "Trigger deploy" > "Clear cache and deploy site" 

## Explanation

The error occurred because Netlify's serverless environment couldn't find the Chromium executable needed by Puppeteer. The fix ensures that:

1. Chromium binary files are included in the function deployment
2. The function uses the correct path to the Chromium executable
3. The function has enough time to run (60 seconds instead of 26)

This should resolve the issue and allow your function to properly scrape data from GetAllMyLinks. 