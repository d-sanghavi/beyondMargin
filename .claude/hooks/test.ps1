$ErrorActionPreference = "Stop"
# beyondMargin prototype: Vitest
if (Test-Path "package.json") { npm test }
