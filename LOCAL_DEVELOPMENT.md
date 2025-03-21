# Local Development Guide

This guide explains how to run and test the GetAllMyLinks Analytics Dashboard locally before deploying to Netlify.

## Prerequisites

- Node.js (version 14 or higher recommended)
- npm or yarn

## Setup

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Configure environment variables**:
   
   Create a `.env` file in the project root with the following content:
   ```
   # GetAllMyLinks credentials
   GETALLMYLINKS_EMAIL=your_email@example.com
   GETALLMYLINKS_PASSWORD=your_password
   
   # Function settings
   NODE_VERSION=16
   ```
   
   Replace `your_email@example.com` and `your_password` with your GetAllMyLinks credentials.

3. **Install Netlify CLI** (if not already installed):
   ```bash
   npm install -g netlify-cli
   ```

## Run Locally

We've provided two ways to run the project locally:

### Option 1: Using the helper script (recommended)

```bash
npm start
```

This script:
- Checks for dependencies and installs them if needed
- Creates a template `.env` file if it doesn't exist
- Starts the Netlify development server

### Option 2: Using Netlify CLI directly

```bash
netlify dev
```

## Testing

Once the local server is running, you can access:

- **Main Dashboard**: http://localhost:8888
- **Test Page**: http://localhost:8888/test.html
- **Sample Data Function**: http://localhost:8888/.netlify/functions/sample_data_provider

The test page allows you to verify that the sample data function is working correctly.

## Deploying to Netlify

After you've verified everything works locally, you can deploy to Netlify:

1. **Login to Netlify**:
   ```bash
   netlify login
   ```

2. **Link to existing site** (if you already have a Netlify site):
   ```bash
   netlify link
   ```

3. **Deploy**:
   ```bash
   npm run deploy
   ```
   or
   ```bash
   netlify deploy --prod
   ```

## Troubleshooting

1. **Function not found**: Make sure you're using the correct function path. The path should be `.netlify/functions/sample_data_provider`.

2. **CORS errors**: These should be handled by the function itself, but if you experience CORS issues, make sure you're accessing the function from the same localhost port.

3. **Environment variable issues**: Check that your `.env` file is properly formatted and contains the required variables.

4. **Port conflicts**: If port 8888 is already in use, Netlify CLI will automatically select another port. Check the console output for the correct URL. 