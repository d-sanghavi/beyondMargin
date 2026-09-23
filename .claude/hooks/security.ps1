$ErrorActionPreference = "Stop"
if (Test-Path "package-lock.json") { npm audit --audit-level=high }
if (Get-Command gitleaks -ErrorAction SilentlyContinue) { gitleaks detect --no-banner }