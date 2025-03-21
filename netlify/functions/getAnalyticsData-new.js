const chromium = require('@sparticuz/chromium');
const puppeteer = require('puppeteer-core');

exports.handler = async function(event, context) {
  // Set CORS headers for browser requests
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  };

  // Handle preflight OPTIONS request
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers
    };
  }
  
  console.log('Function environment:', {
    platform: process.platform,
    arch: process.arch,
    nodeVersion: process.version,
    netlifyDev: process.env.NETLIFY_DEV,
    functionName: context.functionName,
    timeout: context.getRemainingTimeInMillis ? context.getRemainingTimeInMillis() : 'unknown'
  });
  
  try {
    // Check if credentials exist
    const email = process.env.GETALLMYLINKS_EMAIL;
    const password = process.env.GETALLMYLINKS_PASSWORD;
    
    if (!email || !password) {
      console.error('Missing credentials in environment variables');
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ 
          error: 'Missing GetAllMyLinks credentials',
          missingEmail: !email,
          missingPassword: !password
        })
      };
    }
    
    console.log('Preparing to launch browser...');
    
    // Instead of attempting to launch in the function, provide mock/sample data for now
    // This helps verify if the rest of the application works correctly
    
    // Generate some plausible sample data
    // Later we can replace this with real scraping once we solve the Chromium compatibility.
    const sampleData = {
      totalVisits: "32,546",
      uniqueVisitors: "14,259",
      sessionDuration: "2m 34s",
      devices: {
        mobile: "65%",
        desktop: "30%",
        tablet: "5%"
      },
      links: [
        { title: "Instagram Profile", url: "instagram.com/yourprofile", clicks: "8,452" },
        { title: "YouTube Channel", url: "youtube.com/c/yourchannel", clicks: "6,789" },
        { title: "Twitter/X Profile", url: "twitter.com/yourhandle", clicks: "5,124" },
        { title: "TikTok Profile", url: "tiktok.com/@yourhandle", clicks: "4,987" },
        { title: "Personal Website", url: "yourwebsite.com", clicks: "3,921" }
      ],
      trafficOverTime: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        values: [2500, 3200, 3800, 4200, 4800, 5300, 6100, 7200, 8500, 9200, 10800, 12500],
        visitorValues: [1200, 1600, 1900, 2100, 2400, 2650, 3050, 3600, 4250, 4600, 5400, 6250]
      },
      timestamp: new Date().toISOString(),
      isRealData: false,
      message: "Sample data provided due to scraping issues. We're working on resolving the Chromium compatibility."
    };
    
    // Send the sample data for now
    console.log('Returning sample data temporarily until scraping is fixed');
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(sampleData)
    };
    
  } catch (error) {
    console.error('Error:', error.message);
    console.error('Stack:', error.stack);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: `Function error: ${error.message}`,
        stack: error.stack
      })
    };
  }
}; 