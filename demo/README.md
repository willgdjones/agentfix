# agentfix Demos

This directory contains simple buggy examples in various programming languages to demonstrate `agentfix`'s multi-language support.

## Usage

For each example, you can run `agentfix` with the corresponding command. Make sure you have `CURSOR_API_KEY` or `ANTHROPIC_API_KEY` exported in your environment.

### Node.js (JavaScript)
```bash
agentfix node server.js
```

### Python
```bash
agentfix python python_error.py
```

### Ruby
```bash
agentfix ruby ruby_error.rb
```

### Go
```bash
agentfix go run go_error.go
```

### Rust
```bash
agentfix rustc rust_error.rs
```

### Java
```bash
agentfix java JavaError.java
```

### PHP
```bash
agentfix php php_error.php
```

### C#
```bash
agentfix csc CSharpError.cs
# OR
agentfix dotnet run # if setup as a project
```

## How it works

`agentfix` will:
1. Run the command
2. Capture the error output and stack trace
3. Identify the language and specific error location
4. Use AI (Cursor or Claude) to analyze and fix the file
5. Once fixed, you can run the command again to verify the fix!
