$ErrorActionPreference = "Stop"

# beyondMargin is a client-side-only prototype: it should contain NO secrets at all.
$excluded = "\\node_modules\\|\\.git\\|\\dist\\|\\.claude-backup-"
$patterns = @(
    "(OPENAI|ANTHROPIC|GOOGLE|GEMINI|HF|HUGGINGFACE)[_A-Z]*API_KEY\s*=",
    "AWS_SECRET_ACCESS_KEY\s*=",
    "(SECRET|PRIVATE)_KEY\s*=",
    "-----BEGIN (RSA |EC |OPENSSH )?PRIVATE KEY-----",
    "Bearer\s+[A-Za-z0-9\-_\.]{20,}"
)

$found = $false

Get-ChildItem -Recurse -File -ErrorAction SilentlyContinue |
Where-Object { $_.FullName -notmatch $excluded -and $_.Name -notmatch "^\.env(\.|$)" } |
ForEach-Object {
    $text = Get-Content $_.FullName -Raw -ErrorAction SilentlyContinue
    foreach ($pattern in $patterns) {
        if ($text -match $pattern) {
            Write-Error "Potential secret detected in $($_.FullName)"
            $found = $true
        }
    }
}

if ($found) { exit 1 }
Write-Host "Secret scan passed (prototype should contain no secrets)."
