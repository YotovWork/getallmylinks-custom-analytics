# GetAllMyLinks Analytics Dashboard

A custom analytics dashboard for GetAllMyLinks that scrapes your analytics data and displays it in a beautiful, customizable dashboard.

## Features

- 📊 Custom analytics dashboard for GetAllMyLinks
- 📱 Responsive design works on mobile and desktop
- 🔄 Refresh button to fetch the latest data
- 📈 Charts for traffic, sources, and device breakdown
- 🔒 Secure credential storage in Netlify environment variables

## Setup Instructions

1. Deploy to Netlify
2. Add environment variables: GETALLMYLINKS_EMAIL and GETALLMYLINKS_PASSWORD
3. Trigger a new deploy

See full documentation at: https://github.com/YotovWork/getallmylinks-analytics-dashboard/blob/enhanced-scraper/temp_fix/README.md

## How It Works

This dashboard uses a Netlify serverless function to:

1. Log in to your GetAllMyLinks account using Puppeteer and headless Chrome
2. Scrape your analytics data
3. Return the data to the dashboard
4. Display the data in beautiful charts and tables

Data is fetched on-demand when you click the "Refresh Analytics Data" button.

## Troubleshooting

### Check Function Logs

If data isn't loading:
1. Go to your Netlify dashboard > Functions
2. Find the `getAnalyticsData` function
3. Check the logs for any errors

### Common Issues

- **Missing Environment Variables**: Make sure GETALLMYLINKS_EMAIL and GETALLMYLINKS_PASSWORD are set
- **Incorrect Credentials**: Double-check your GetAllMyLinks login details
- **Function Timeout**: If you see timeout errors, the function might be taking too long. Try again later.
- **Site Structure Changed**: If GetAllMyLinks changes their site, the scraper might break. Check for errors in the function logs.

## Local Development

1. Clone this repository
2. Install dependencies: `npm install`
3. Create a `.env` file with the required environment variables:
   ```
   GETALLMYLINKS_EMAIL=your-email@example.com
   GETALLMYLINKS_PASSWORD=your-password
   ```
4. Run the development server: `npm start`

## License

MIT 