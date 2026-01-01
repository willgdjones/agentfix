# agentfix

Auto-fix errors in your dev server as they happen using AI (Cursor or Claude). Never stop to debug — the AI fixes bugs while you keep building.

## Installation

```bash
npm install -g agentfix
```

## Setup

You can use either Cursor or Claude as your AI provider.

### Option 1: Cursor (Default)
Get a Cursor API key from the [Cursor Dashboard](https://cursor.com/dashboard?tab=integrations), then:

```bash
export CURSOR_API_KEY="your_key"
```

### Option 2: Claude
Get an Anthropic API key from the [Anthropic Console](https://console.anthropic.com/), then:

```bash
export ANTHROPIC_API_KEY="your_key"
```

## Usage

Wrap any dev command with `agentfix`:

```bash
agentfix npm run dev
agentfix npx next dev
agentfix "node --watch server.js"
```

> **Tip:** Use `node --watch` (Node 18+) for automatic server restart when files change. Frameworks like Next.js and Vite have hot reload built-in.

## How It Works

```
┌──────────────────────────────────────────────────────────────┐
│  Terminal                                                     │
│                                                              │
│  $ agentfix npm run dev                                       │
│                                                              │
│  🔧 AgentFix                                                  │
│  Starting: npm run dev                                       │
│  Using provider: Cursor                                      │
│  Monitoring for errors...                                    │
│                                                              │
│  Demo server running at http://localhost:3000                │
│                                                              │
│  TypeError: Cannot read properties of undefined              │
│    (reading 'toUpperCase')                                   │
│    at server.js:35:43                                       │
│                                                              │
│  [agentfix] 🔍 Error detected!                                │
│    Type: TypeError                                           │
│    Message: Cannot read properties of undefined             │
│      (reading 'toUpperCase')                                 │
│    File: server.js:35                                        │
│                                                              │
│  [agentfix] 🔧 Fixing...                                       │
│  I'll help you fix this TypeError. Let me first examine     │
│  the server.js file to understand the context around         │
│  line 35.                                                    │
│                                                              │
│  [agentfix] 🔧 read: Reading server.js                        │
│                                                              │
│  I can see the issue clearly. On line 35, there's a typo:    │
│  `u.nmee` should be `u.name`. The property `nmee` doesn't  │
│  exist on the user objects, so it returns `undefined`, and   │
│  calling `toUpperCase()` on `undefined` causes the          │
│  TypeError.                                                 │
│                                                              │
│  [agentfix] 🔧 edit: Editing server.js                       │
│  [agentfix] ✅ Modified: server.js                            │
│                                                              │
│  Restarting 'server.js'                                      │
│  Demo server running at http://localhost:3000                │
│                                                              │
│  The error has been fixed. The issue was a simple typo on   │
│  line 35 where `u.nmee` should have been `u.name`.          │
│                                                              │
│  [agentfix] ✅ Fixed server.js                                 │
│    Hot reload should kick in shortly...                      │
│                                                              │
│└──────────────────────────────────────────────────────────────┘
```

1. **Wraps** your dev server as a child process
2. **Monitors** stdout/stderr for error patterns
3. **Detects** errors and extracts file/line info from stack traces
4. **Analyzes** the code and explains the root cause
5. **Fixes** the code using AI agent (Cursor or Claude)
6. **Hot reload** picks up the changes automatically

## Options

```bash
agentfix --help          # Show help
agentfix --dry-run ...   # Detect errors without fixing
```

## Requirements

- Node.js 18+
- `CURSOR_API_KEY` or `ANTHROPIC_API_KEY` environment variable

## Example

```bash
# Start a Next.js app with agentfix
agentfix npm run dev

# Navigate to a buggy page
# Watch the error appear and get fixed automatically!
```

## Changelog

See [CHANGELOG.md](CHANGELOG.md) for release history.

## License

MIT
