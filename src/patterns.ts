// Error patterns for common JavaScript/TypeScript frameworks

export interface ErrorPattern {
  name: string;
  // Regex to match the error type and message
  errorRegex: RegExp;
  // Regex to extract file path and line number from stack trace
  locationRegex: RegExp;
  // Optional: extract from a combined pattern
  combinedRegex?: RegExp;
}

export const ERROR_PATTERNS: ErrorPattern[] = [
  // Next.js / React compilation errors
  {
    name: 'nextjs-compile',
    errorRegex: /(?:Error|TypeError|SyntaxError|ReferenceError):\s*(.+)/,
    locationRegex: /at\s+(?:\w+\s+)?\(?([^:]+):(\d+):(\d+)\)?/,
    combinedRegex: /([A-Za-z]*Error):\s*(.+?)(?:\n|\r\n).*?(?:at\s+(?:\w+\s+)?\(?)?([^:\s]+\.[jt]sx?):(\d+)(?::(\d+))?/s,
  },

  // Next.js specific error format
  {
    name: 'nextjs-error',
    errorRegex: /(?:Unhandled Runtime Error|Error):\s*(.+)/,
    locationRegex: /(?:Source|File):\s*([^:]+):(\d+)/,
    combinedRegex: /(?:Unhandled Runtime Error|Error)[:\s]+([A-Za-z]*Error)?:?\s*(.+?)(?:\n|\r\n).*?(?:Source|File)?[:\s]*([^:\s]+\.[jt]sx?):(\d+)/s,
  },

  // TypeScript compilation errors
  {
    name: 'typescript',
    errorRegex: /TS\d+:\s*(.+)/,
    locationRegex: /([^(]+\.[jt]sx?)\((\d+),(\d+)\)/,
    combinedRegex: /([^(\s]+\.[jt]sx?)\((\d+),(\d+)\):\s*error\s*(TS\d+):\s*(.+)/,
  },

  // ESLint errors
  {
    name: 'eslint',
    errorRegex: /(?:error|warning)\s+(.+?)\s+(?:@|eslint)/i,
    locationRegex: /([^:\s]+\.[jt]sx?):(\d+):(\d+)/,
    combinedRegex: /([^:\s]+\.[jt]sx?):(\d+):(\d+)\s*(?:error|warning)\s+(.+?)\s+(?:@|eslint)/i,
  },

  // Node.js runtime errors
  {
    name: 'node-runtime',
    errorRegex: /^([A-Z][a-zA-Z]*Error):\s*(.+)$/m,
    locationRegex: /at\s+(?:[\w.<>]+\s+)?\(?([^:]+):(\d+):(\d+)\)?/,
  },

  // Vite errors
  {
    name: 'vite',
    errorRegex: /\[vite\].*?(?:Error|error):\s*(.+)/i,
    locationRegex: /([^:\s]+\.[jt]sx?):(\d+):(\d+)/,
  },

  // Webpack errors
  {
    name: 'webpack',
    errorRegex: /Module (?:build |parse )?failed.*?Error:\s*(.+)/i,
    locationRegex: /@ ([^:\s]+\.[jt]sx?):?(\d+)?:?(\d+)?/,
  },

  // Generic JavaScript errors with stack trace
  {
    name: 'generic-js',
    errorRegex: /(?:Uncaught\s+)?([A-Z][a-zA-Z]*Error):\s*(.+)/,
    locationRegex: /(?:at\s+(?:[\w.<>]+\s+)?\(?)?([^:\s()]+\.[jt]sx?):(\d+)(?::(\d+))?\)?/,
  },

  // Python Tracebacks
  {
    name: 'python',
    errorRegex: /^([A-Z][a-zA-Z]*Error):\s*(.+)$/m,
    locationRegex: /File\s+"([^"]+)",\s+line\s+(\d+)/,
    combinedRegex: /File\s+"([^"]+)",\s+line\s+(\d+).*?\n(?:.*?\n)?([A-Z][a-zA-Z]*Error):\s*(.+)$/m,
  },

  // Ruby Errors
  {
    name: 'ruby',
    errorRegex: /:\s*(.+?)\s*\(([A-Z][a-zA-Z]*Error)\)$/,
    locationRegex: /([^:\s]+):(\d+):in/,
    combinedRegex: /([^:\s]+):(\d+):in\s+.*?:?\s*(.+?)\s*\(([A-Z][a-zA-Z]*Error)\)$/m,
  },

  // Go Panic and Compile Errors
  {
    name: 'go',
    errorRegex: /(?:panic:\s+)?(.+)/,
    locationRegex: /([^\s]+\.go):(\d+)(?::(\d+))?/,
    combinedRegex: /(?:panic:\s+)?(.+?)\s*\n.*?\n\s+([^\s]+\.go):(\d+)/s,
  },

  // Rust compiler errors
  {
    name: 'rust',
    errorRegex: /error(?:\[E\d+\])?:\s*(.+)/,
    locationRegex: /-->\s+([^:]+):(\d+):(\d+)/,
    combinedRegex: /error(?:\[E\d+\])?:\s*(.+?)\n\s+-->\s+([^:]+):(\d+):(\d+)/s,
  },

  // Java stack traces
  {
    name: 'java',
    errorRegex: /^([a-zA-Z0-9.]+(?:Exception|Error)):\s*(.+)$/m,
    locationRegex: /at\s+[a-zA-Z0-9.$_]+\s*\(([^:]+):(\d+)\)/,
    combinedRegex: /^([a-zA-Z0-9.]+(?:Exception|Error)):\s*(.+?)\n\s+at\s+[a-zA-Z0-9.$_]+\s*\(([^:]+):(\d+)\)/m,
  },

  // PHP errors
  {
    name: 'php',
    errorRegex: /(?:Fatal error|Parse error|Uncaught TypeError):\s*(.+?)\s+in\s+/,
    locationRegex: /in\s+([^:\s]+)\s+on\s+line\s+(\d+)/,
    combinedRegex: /(?:Fatal error|Parse error|Uncaught TypeError):\s*(.+?)\s+in\s+([^:\s]+)\s+on\s+line\s+(\d+)/,
  },

  // C# .NET errors
  {
    name: 'csharp',
    errorRegex: /^([a-zA-Z0-9.]+(?:Exception|Error)):\s*(.+)$/m,
    locationRegex: /in\s+([^:\s]+):line\s+(\d+)/,
    combinedRegex: /^([a-zA-Z0-9.]+(?:Exception|Error)):\s*(.+?)\n\s+at\s+.*?in\s+([^:\s]+):line\s+(\d+)/m,
  },
];

// File extensions we can fix
export const FIXABLE_EXTENSIONS = [
  // JavaScript/TypeScript
  '.js', '.jsx', '.ts', '.tsx', '.mjs', '.cjs',
  // Python
  '.py',
  // Ruby
  '.rb', '.erb',
  // Go
  '.go',
  // Rust
  '.rs',
  // Java
  '.java',
  // PHP
  '.php',
  // C#
  '.cs'
];

// Paths to ignore
export const IGNORE_PATHS = [
  // JavaScript
  'node_modules', '.next', 'dist', 'build',
  // Python
  '__pycache__', '.venv', 'venv', 'site-packages',
  // Ruby
  'vendor/bundle',
  // Go
  'vendor',
  // Rust
  'target',
  // Java
  'target', '.gradle', 'build',
  // PHP
  'vendor',
  // C#
  'bin', 'obj',
  // General
  '.git'
];

