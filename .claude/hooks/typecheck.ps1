$ErrorActionPreference = "Stop"
# beyondMargin prototype: TypeScript (frontend lives in ./client)
if (Test-Path "client\tsconfig.json") { npm run typecheck }
elseif (Test-Path "tsconfig.json") { npx tsc --noEmit }
