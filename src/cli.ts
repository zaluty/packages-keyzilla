#!/usr/bin/env node

const { execSync } = require('child_process');
/*
this is the entry point for the cli we had to use this file because of some err encountered during the developement 
*/
const command = process.argv[2];

switch (command) {
  case 'login':
    execSync('node dist/auth/index.js', { stdio: 'inherit' });
    break;
  case 'logout':
    execSync('node dist/logout/index.js', { stdio: 'inherit' });
    break;
  case 'pull':
    execSync('node dist/projects/main.js', { stdio: 'inherit' });
    break;
  default:
    console.log(`Unknown command: ${command}`);
    process.exit(1);
}