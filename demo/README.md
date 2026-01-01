# aifix Demos

This directory contains simple buggy examples in various programming languages to demonstrate `aifix`'s multi-language support.

## Usage

For each example, you can run `aifix` with the corresponding command. Make sure you have `CURSOR_API_KEY` or `ANTHROPIC_API_KEY` exported in your environment.

### Node.js (JavaScript)
```bash
aifix node server.js
```

### Python
```bash
aifix python python_error.py
```

### Ruby
```bash
aifix ruby ruby_error.rb
```

### Go
```bash
aifix go run go_error.go
```

### Rust
```bash
aifix rustc rust_error.rs
```

### Java
```bash
aifix java JavaError.java
```

### PHP
```bash
aifix php php_error.php
```

### C#
```bash
aifix csc CSharpError.cs
# OR
aifix dotnet run # if setup as a project
```

## How it works

`aifix` will:
1. Run the command
2. Capture the error output and stack trace
3. Identify the language and specific error location
4. Use AI (Cursor or Claude) to analyze and fix the file
5. Once fixed, you can run the command again to verify the fix!
