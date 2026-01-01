# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.0.0] - 2026-01-01

### Added
- **Initial Release of aifix** (formerly `cursor-autofix`).
- **Multi-language Support**: Support for parsing and fixing errors in Python, Ruby, Go, Rust, Java, PHP, and C#.
- **Dual AI Providers**: Support for both Cursor AI (via January SDK) and Anthropic Claude (via Claude Agent SDK).
- **Claude Agent SDK Integration**: Uses `@anthropic-ai/claude-agent-sdk` for autonomous file editing.
- **Demo Suite**: Comprehensive set of buggy demo scripts and documentation for all supported languages.
- **Modern CLI**: Colorized output and real-time monitoring of dev server processes.

### Changed
- Refactored architecture to use a provider-based abstraction for AI backends.
- Improved regex-based error parsing for robust detection across different language stack traces.
- Optimized terminal output for better visibility into the AI's "thought" and "action" process.
