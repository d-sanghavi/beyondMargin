$ErrorActionPreference = "Stop"
# beyondMargin prototype: ESLint
if (Test-Path "package.json") { npm run lint }
