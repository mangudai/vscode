# AoE2 Random Map Scripting

> Age of Empires 2 Random Map Scripting support for Visual Studio Code

![Screeshot of syntax highlighting](https://github.com/mangudai/vscode/blob/master/client/screenshot.png?raw=true)

## Install

In Visual Studio Code open the Extensions sidebar (`Ctrl/Cmd + Shift + X`), then search for `aoe2`.

## Release Notes

### 0.3.0

- Updated for latest VS Code
- Fixed syntax error on negative numbers
- Fixed various edge cases in linter
- Allowed nested comments
- Changed error messages to be clearer

### 0.2.7, 0.2.8, 0.2.9

- Allowed identifiers to start with digits.

### 0.2.6

- Removed extra spaces from block comments: `/* |   */` is now `/* | */` (`|` is where the cursor is after expansion).

### 0.2.5

- Added highighting of random blocks and directives inside command blocks.
- Improved both repo root `README.md` and this one.

### 0.2.2, 0.2.3, 0.2.4

- Fixed link to the screenshot in `README.md`.

### 0.2.1

- Fixed extension description.
- Updated Mangudai to fix linting errors highlighting.

### 0.2.0

- Added linting using [Mangudai](https://github.com/mangudai/mangudai).
- Added an icon.
- Separated VS Code and Sublime Text support into two repos as they're becoming quite different.

### 0.1.2

- Fixed highlighting of command blocks that start on the same line: `create_object TOWN_CENTER { ... }`.
- Fixed parsing `if` and `elseif` where identifier is valid but not UPPER_CASE. Identifiers can be almost anything.

### 0.1.1

- Fixed highlighting of inline comments after commands and directives.
- Added meta info: `LICENSE` file, links to the repo in `package.json`.

### 0.1.0

- Added syntax highlighting.

## Contributing

### Structure

```
.
├── client // Language Client
│   ├── src
│   │   ├── test // End to End tests for Language Client / Server
│   │   └── extension.ts // Language Client entry point
├── package.json // The extension manifest.
└── server // Language Server
    └── src
        └── server.ts // Language Server entry point
```

### Compile and Run

- Run `npm install` in this folder. This installs all necessary npm modules in both the client and server folder
- Open VS Code on this folder.
- Press Ctrl+Shift+B to compile the client and server.
- Switch to the Debug viewlet.
- Select `Launch Client` from the drop down.
- Run the lauch config.
- If you want to debug the server as well use the launch configuration `Attach to Server`
- In the [Extension Development Host] instance of VSCode, open a document in 'aoe2-rms' language mode.
