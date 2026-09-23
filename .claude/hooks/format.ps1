$ErrorActionPreference = "Stop"
# beyondMargin prototype: Prettier
if (Test-Path "package.json") {
    if (Test-Path "node_modules\.bin\prettier.cmd") { npx prettier --write . }
}
