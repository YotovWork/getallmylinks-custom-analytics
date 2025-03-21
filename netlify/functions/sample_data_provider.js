// This is a completely new function that only provides sample data
exports.handler = async function(event, context) {
  console.log('SAMPLE_DATA_PROVIDER FUNCTION CALLED at', new Date().toISOString());
  
  // Set CORS headers
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
  
  console.log('Request details:', { 
    path: event.path,
    httpMethod: event.httpMethod,
    queryParams: event.queryStringParameters || {},
  });
  
  // Sample data with a unique identifier to confirm it's from this function
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
    // Special marker to verify this is from our new function
    source: "SAMPLE_DATA_PROVIDER",
    isRealData: false,
    timestamp: new Date().toISOString(),
    message: "SAMPLE DATA: This is static data from sample_data_provider.js"
  };
  
  console.log('SAMPLE_DATA_PROVIDER returning sample data');
  
  return {
    statusCode: 200,
    headers,
    body: JSON.stringify(sampleData)
  };
}; 