#!/usr/bin/env node

/**
 * Helper script to run the local development environment
 * This ensures the project is properly set up for local testing
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Colors for terminal output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  cyan: '\x1b[36m'
};

console.log(`${colors.bright}${colors.cyan}=== GetAllMyLinks Analytics Dashboard - Local Development ===${colors.reset}\n`);

// Check if .env file exists
if (!fs.existsSync('.env')) {
  console.log(`${colors.yellow}Warning: No .env file found. Creating a template .env file...${colors.reset}`);
  
  const envTemplate = `# Local environment variables for development
# These are used only for local development and not pushed to Git

# GetAllMyLinks credentials
GETALLMYLINKS_EMAIL=your_email@example.com
GETALLMYLINKS_PASSWORD=your_password

# Function settings
NODE_VERSION=16
`;
  
  fs.writeFileSync('.env', envTemplate);
  console.log(`${colors.green}Created .env file. Please edit it with your credentials.${colors.reset}\n`);
}

// Check if node_modules exists, if not run npm install
if (!fs.existsSync('node_modules')) {
  console.log(`${colors.yellow}Installing dependencies...${colors.reset}`);
  try {
    execSync('npm install', { stdio: 'inherit' });
    console.log(`${colors.green}Dependencies installed.${colors.reset}\n`);
  } catch (error) {
    console.error(`${colors.red}Error installing dependencies. Please run npm install manually.${colors.reset}`);
    process.exit(1);
  }
}

// Check if netlify-cli is installed
try {
  execSync('netlify --version', { stdio: 'pipe' });
} catch (error) {
  console.log(`${colors.yellow}Netlify CLI not found. Installing...${colors.reset}`);
  try {
    execSync('npm install -g netlify-cli', { stdio: 'inherit' });
    console.log(`${colors.green}Netlify CLI installed.${colors.reset}\n`);
  } catch (error) {
    console.error(`${colors.red}Error installing Netlify CLI. Please run 'npm install -g netlify-cli' manually.${colors.reset}`);
    process.exit(1);
  }
}

// Start the development server
console.log(`${colors.green}Starting Netlify development server...${colors.reset}`);
console.log(`${colors.cyan}You can access:${colors.reset}`);
console.log(`  - Main dashboard: ${colors.bright}http://localhost:8888${colors.reset}`);
console.log(`  - Test page: ${colors.bright}http://localhost:8888/test.html${colors.reset}`);
console.log(`  - Functions: ${colors.bright}http://localhost:8888/.netlify/functions/sample_data_provider${colors.reset}\n`);

try {
  execSync('netlify dev', { stdio: 'inherit' });
} catch (error) {
  console.error(`${colors.red}Error starting Netlify development server.${colors.reset}`);
  process.exit(1);
} 