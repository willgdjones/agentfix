#!/usr/bin/env node

import { runWithAutofix } from './runner.js';
import chalk from 'chalk';

const args = process.argv.slice(2);

// Check for help flag
if (args.includes('--help') || args.includes('-h') || args.length === 0) {
  console.log(`
${chalk.bold.cyan('agentfix')} - Auto-fix errors in your dev server as they happen

${chalk.bold('Usage:')}
  agentfix <command>

${chalk.bold('Examples:')}
  agentfix npm run dev
  agentfix npx next dev
  agentfix node server.js

${chalk.bold('Environment:')}
  CURSOR_API_KEY     Required (or ANTHROPIC_API_KEY). Your Cursor API key.
  ANTHROPIC_API_KEY  Required (or CURSOR_API_KEY). Your Anthropic API key.

${chalk.bold('Options:')}
  --help, -h      Show this help message
  --dry-run       Show detected errors without fixing
  `);
  process.exit(0);
}

// Check for API key
if (!process.env.CURSOR_API_KEY && !process.env.ANTHROPIC_API_KEY) {
  console.error(chalk.red('Error: CURSOR_API_KEY or ANTHROPIC_API_KEY environment variable is required.'));
  console.error(chalk.gray('Set one with: export CURSOR_API_KEY="your_key" OR export ANTHROPIC_API_KEY="your_key"'));
  process.exit(1);
}

// Extract flags
const dryRun = args.includes('--dry-run');
const command = args.filter(arg => !arg.startsWith('--')).join(' ');

if (!command) {
  console.error(chalk.red('Error: No command provided.'));
  console.error(chalk.gray('Usage: agentfix <command>'));
  process.exit(1);
}

const providerName = process.env.CURSOR_API_KEY ? 'Cursor' : 'Claude';

console.log(chalk.cyan.bold('\n🔧 AgentFix'));
console.log(chalk.gray(`Starting: ${command}`));
console.log(chalk.gray(`Using provider: ${providerName}`));
console.log(chalk.gray('Monitoring for errors...\n'));

runWithAutofix(command, { dryRun });

