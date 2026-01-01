import type { ParsedError } from './parser.js';
import { getProvider } from './providers.js';
import chalk from 'chalk';

export async function fixError(error: ParsedError): Promise<boolean> {
  const provider = getProvider();
  
  if (!provider) {
    console.error(chalk.red('[agentfix] Neither CURSOR_API_KEY nor ANTHROPIC_API_KEY set'));
    return false;
  }

  return provider.fixError(error);
}

