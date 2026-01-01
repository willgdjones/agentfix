import { CursorAgent } from '@cursor-ai/january';
import { query } from '@anthropic-ai/claude-agent-sdk';
import type { ParsedError } from './parser.js';
import chalk from 'chalk';

export interface AIProvider {
  name: string;
  fixError(error: ParsedError): Promise<boolean>;
}

export class CursorProvider implements AIProvider {
  name = 'Cursor';
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async fixError(error: ParsedError): Promise<boolean> {
    const agent = new CursorAgent({
      apiKey: this.apiKey,
      model: 'claude-4-sonnet',
      workingLocation: {
        type: 'local',
        localDirectory: process.cwd()
      }
    });

    const prompt = buildFixPrompt(error);

    try {
      const { stream } = agent.submit({
        message: prompt
      });

      let textBuffer = '';
      for await (const update of stream) {
        if (update.type === 'text-delta') {
          process.stdout.write(chalk.gray(update.text));
          textBuffer += update.text;
        } else if (update.type === 'tool-call-started') {
          if (textBuffer) {
            console.log();
            textBuffer = '';
          }
          console.log(chalk.cyan(`\n[agentfix] 🔧 ${update.toolCall.type}: ${getToolDescription(update.toolCall)}`));
        } else if (update.type === 'tool-call-completed') {
          if (update.toolCall.type === 'edit' || update.toolCall.type === 'write') {
            console.log(chalk.green(`\n[agentfix] ✅ Modified: ${getFilePath(update.toolCall)}`));
          }
        }
      }
      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : String(err);
      console.error(chalk.red(`\n[agentfix] Cursor error: ${errorMessage}`));
      return false;
    }
  }
}

export class ClaudeProvider implements AIProvider {
  name = 'Claude';
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async fixError(error: ParsedError): Promise<boolean> {
    const prompt = buildFixPrompt(error);

    try {
      // Set environment variable for the SDK
      process.env.ANTHROPIC_API_KEY = this.apiKey;

      const result = query({
        prompt,
          options: {
            allowedTools: ['Read', 'Edit', 'Write', 'Bash', 'Glob', 'Grep'],
            permissionMode: 'acceptEdits' // Auto-accept edits for agentfix
          }
        });

      let textBuffer = '';
      for await (const message of result) {
        const msg = message as any;
        
        if (msg.type === 'assistant' && msg.content) {
          if (typeof msg.content === 'string') {
            process.stdout.write(chalk.gray(msg.content));
            textBuffer += msg.content;
          } else if (Array.isArray(msg.content)) {
            for (const item of msg.content) {
              if (item.type === 'text') {
                process.stdout.write(chalk.gray(item.text));
                textBuffer += item.text;
              } else if (item.type === 'tool_use') {
                console.log(chalk.cyan(`\n[agentfix] 🔧 ${item.name}: ${item.input?.file_path || item.input?.path || ''}`));
              }
            }
          }
        } else if (msg.type === 'tool_progress' && msg.tool_name) {
          // Some versions of the SDK use tool_progress for real-time tool info
          if (msg.status === 'started') {
             console.log(chalk.cyan(`\n[agentfix] 🔧 ${msg.tool_name}`));
          } else if (msg.status === 'success') {
             if (msg.tool_name === 'Edit' || msg.tool_name === 'Write') {
                console.log(chalk.green(`[agentfix] ✅ Modified file`));
             }
          }
        } else if (msg.type === 'result') {
          // Final result
          if (msg.result) {
            console.log(chalk.gray(`\n${msg.result}`));
          }
        }
      }

      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : String(err);
      console.error(chalk.red(`\n[agentfix] Claude error: ${errorMessage}`));
      return false;
    }
  }
}

export function getProvider(): AIProvider | null {
  if (process.env.CURSOR_API_KEY) {
    return new CursorProvider(process.env.CURSOR_API_KEY);
  }
  if (process.env.ANTHROPIC_API_KEY) {
    return new ClaudeProvider(process.env.ANTHROPIC_API_KEY);
  }
  return null;
}

function buildFixPrompt(error: ParsedError): string {
  return `Fix this ${error.type} error in the codebase:

**Error:** ${error.message}

**Location:** ${error.file}:${error.line}${error.column ? ':' + error.column : ''}

**Stack Trace:**
\`\`\`
${error.stackTrace}
\`\`\`

Instructions:
1. Read the file to understand the context
2. Identify the root cause of the error
3. Fix the error with a minimal, targeted change
4. Do NOT refactor unrelated code
5. Do NOT add comments explaining the fix
6. Just fix the bug and nothing else

Focus on fixing this specific error. Be concise.`;
}

function getFilePath(toolCall: any): string {
  if (toolCall.args?.path) return toolCall.args.path;
  if (toolCall.args?.file_path) return toolCall.args.file_path;
  return 'file';
}

function getToolDescription(toolCall: any): string {
  if (toolCall.type === 'read') return `Reading ${toolCall.args?.path || 'file'}`;
  if (toolCall.type === 'edit' || toolCall.type === 'write') return `Editing ${toolCall.args?.path || toolCall.args?.file_path || 'file'}`;
  return toolCall.type;
}

