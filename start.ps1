# Presenton Windows Startup Script
# Using remote Ollama: http://llm.leonthepro.space

$ErrorActionPreference = "Stop"

Write-Host "========================================" -ForegroundColor Blue
Write-Host "     Presenton Startup Script (Windows)" -ForegroundColor Blue
Write-Host "========================================" -ForegroundColor Blue

# Set working directory
$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $ScriptDir

# Environment variables
$env:LLM = "ollama"
$env:OLLAMA_URL = "http://llm.leonthepro.space"
$env:OLLAMA_MODEL = "llama3.1:8b"
$env:IMAGE_PROVIDER = "pexels"
$env:PEXELS_API_KEY = "6o9do1Pcf3wAjdGDWjC9HWZsU1m9wph3d2aixCiN48QTwKbdRy69CFP7"
$env:CAN_CHANGE_KEYS = "true"
$env:APP_DATA_DIRECTORY = "$ScriptDir\app_data"
$env:USER_CONFIG_PATH = "$ScriptDir\app_data\user_config.json"
$env:TEMP_DIRECTORY = "$env:TEMP\presenton"
$env:NEXTJS_PORT = "11001"

# Create required directories
if (-not (Test-Path $env:APP_DATA_DIRECTORY)) {
    New-Item -ItemType Directory -Path $env:APP_DATA_DIRECTORY -Force | Out-Null
    Write-Host "Created directory: $env:APP_DATA_DIRECTORY" -ForegroundColor Green
}

if (-not (Test-Path $env:TEMP_DIRECTORY)) {
    New-Item -ItemType Directory -Path $env:TEMP_DIRECTORY -Force | Out-Null
    Write-Host "Created directory: $env:TEMP_DIRECTORY" -ForegroundColor Green
}

# Create user_config.json if not exists
if (-not (Test-Path $env:USER_CONFIG_PATH)) {
    $configContent = @"
{
  "LLM": "ollama",
  "OLLAMA_URL": "http://llm.leonthepro.space",
  "OLLAMA_MODEL": "llama3.1:8b",
  "IMAGE_PROVIDER": "pexels",
  "PEXELS_API_KEY": "6o9do1Pcf3wAjdGDWjC9HWZsU1m9wph3d2aixCiN48QTwKbdRy69CFP7"
}
"@
    $configContent | Set-Content -Path $env:USER_CONFIG_PATH -Encoding UTF8
    Write-Host "Created config: $env:USER_CONFIG_PATH" -ForegroundColor Green
}

Write-Host ""
Write-Host "Environment configured:" -ForegroundColor Green
Write-Host "  LLM: $env:LLM"
Write-Host "  OLLAMA_URL: $env:OLLAMA_URL"
Write-Host "  OLLAMA_MODEL: $env:OLLAMA_MODEL"
Write-Host "  IMAGE_PROVIDER: $env:IMAGE_PROVIDER"
Write-Host "  APP_DATA_DIRECTORY: $env:APP_DATA_DIRECTORY"
Write-Host ""

# Check dependencies
Write-Host "Checking dependencies..." -ForegroundColor Yellow

$deps = @("uv", "node", "npm")
foreach ($dep in $deps) {
    if (Get-Command $dep -ErrorAction SilentlyContinue) {
        Write-Host "  OK: $dep installed" -ForegroundColor Green
    } else {
        Write-Host "  ERROR: $dep not installed" -ForegroundColor Red
        exit 1
    }
}
Write-Host ""

# Install Python dependencies
Write-Host "Checking Python dependencies..." -ForegroundColor Yellow
Push-Location "$ScriptDir\servers\fastapi"

if (-not (Test-Path ".venv")) {
    Write-Host "Creating venv and installing dependencies..."
    uv sync
} else {
    Write-Host "Python venv exists"
}
Pop-Location

# Install Node.js dependencies
Write-Host "Checking Node.js dependencies..." -ForegroundColor Yellow
Push-Location "$ScriptDir\servers\nextjs"

if (-not (Test-Path "node_modules")) {
    Write-Host "Installing npm dependencies..."
    npm install
} else {
    Write-Host "npm dependencies exist"
}
Pop-Location

Write-Host ""
Write-Host "Starting services..." -ForegroundColor Yellow
Write-Host ""

# Store processes
$processes = @()

# Start FastAPI backend
Write-Host "Starting FastAPI backend (port 11003)..." -ForegroundColor Blue
$fastapi = Start-Process -FilePath "cmd.exe" -ArgumentList "/c", "uv run server.py --port 11003" -WorkingDirectory "$ScriptDir\servers\fastapi" -PassThru
$processes += $fastapi

Start-Sleep -Seconds 2

# Start MCP Server
Write-Host "Starting MCP Server (port 9001)..." -ForegroundColor Blue
$mcp = Start-Process -FilePath "cmd.exe" -ArgumentList "/c", "uv run mcp_server.py --port 9001" -WorkingDirectory "$ScriptDir\servers\fastapi" -PassThru
$processes += $mcp

Start-Sleep -Seconds 1

# Start Next.js frontend
Write-Host "Starting Next.js frontend (port 11001)..." -ForegroundColor Blue
$nextjs = Start-Process -FilePath "cmd.exe" -ArgumentList "/c", "npm run dev -- -H 0.0.0.0 -p 11001" -WorkingDirectory "$ScriptDir\servers\nextjs" -PassThru
$processes += $nextjs

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "     All services started!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "Frontend: http://localhost:11001" -ForegroundColor Cyan
Write-Host "API:      http://localhost:11003" -ForegroundColor Cyan
Write-Host "API Docs: http://localhost:11003/docs" -ForegroundColor Cyan
Write-Host "MCP:      http://localhost:9001" -ForegroundColor Cyan
Write-Host ""
Write-Host "Press Ctrl+C to stop all services" -ForegroundColor Yellow
Write-Host ""

# Wait and handle exit
try {
    while ($true) {
        Start-Sleep -Seconds 1

        # Check if any process has exited
        $exited = $processes | Where-Object { $_.HasExited }
        if ($exited) {
            Write-Host "A service has stopped" -ForegroundColor Red
            break
        }
    }
}
finally {
    Write-Host ""
    Write-Host "Stopping all services..." -ForegroundColor Yellow
    foreach ($proc in $processes) {
        if (-not $proc.HasExited) {
            Stop-Process -Id $proc.Id -Force -ErrorAction SilentlyContinue
        }
    }
    Write-Host "All services stopped" -ForegroundColor Green
}
