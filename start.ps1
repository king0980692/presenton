# Presenton Windows 啟動腳本
# 使用遠端 Ollama: http://llm.leonthepro.space

$ErrorActionPreference = "Stop"

Write-Host "========================================" -ForegroundColor Blue
Write-Host "     Presenton 啟動腳本 (Windows)" -ForegroundColor Blue
Write-Host "========================================" -ForegroundColor Blue

# 設定工作目錄
$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $ScriptDir

# 環境變數設定
$env:LLM = "ollama"
$env:OLLAMA_URL = "http://llm.leonthepro.space"
$env:OLLAMA_MODEL = "llama3.1:8b"
$env:IMAGE_PROVIDER = "pexels"
$env:PEXELS_API_KEY = "6o9do1Pcf3wAjdGDWjC9HWZsU1m9wph3d2aixCiN48QTwKbdRy69CFP7"
$env:CAN_CHANGE_KEYS = "true"
$env:APP_DATA_DIRECTORY = "$ScriptDir\app_data"
$env:USER_CONFIG_PATH = "$ScriptDir\app_data\user_config.json"
$env:TEMP_DIRECTORY = "$env:TEMP\presenton"
$env:NEXTJS_PORT = "3001"

# 建立必要的目錄
if (-not (Test-Path $env:APP_DATA_DIRECTORY)) {
    New-Item -ItemType Directory -Path $env:APP_DATA_DIRECTORY -Force | Out-Null
    Write-Host "已建立目錄: $env:APP_DATA_DIRECTORY" -ForegroundColor Green
}

if (-not (Test-Path $env:TEMP_DIRECTORY)) {
    New-Item -ItemType Directory -Path $env:TEMP_DIRECTORY -Force | Out-Null
    Write-Host "已建立目錄: $env:TEMP_DIRECTORY" -ForegroundColor Green
}

# 建立 user_config.json (如果不存在)
if (-not (Test-Path $env:USER_CONFIG_PATH)) {
    $config = @{
        LLM = "ollama"
        OLLAMA_URL = "http://llm.leonthepro.space"
        OLLAMA_MODEL = "llama3.1:8b"
        IMAGE_PROVIDER = "pexels"
        PEXELS_API_KEY = "6o9do1Pcf3wAjdGDWjC9HWZsU1m9wph3d2aixCiN48QTwKbdRy69CFP7"
    }
    $config | ConvertTo-Json | Set-Content -Path $env:USER_CONFIG_PATH -Encoding UTF8
    Write-Host "已建立設定檔: $env:USER_CONFIG_PATH" -ForegroundColor Green
}

Write-Host ""
Write-Host "環境變數設定完成:" -ForegroundColor Green
Write-Host "  LLM: $env:LLM"
Write-Host "  OLLAMA_URL: $env:OLLAMA_URL"
Write-Host "  OLLAMA_MODEL: $env:OLLAMA_MODEL"
Write-Host "  IMAGE_PROVIDER: $env:IMAGE_PROVIDER"
Write-Host "  APP_DATA_DIRECTORY: $env:APP_DATA_DIRECTORY"
Write-Host ""

# 檢查依賴
Write-Host "檢查依賴..." -ForegroundColor Yellow

$deps = @("uv", "node", "npm")
foreach ($dep in $deps) {
    if (Get-Command $dep -ErrorAction SilentlyContinue) {
        Write-Host "√ $dep 已安裝" -ForegroundColor Green
    } else {
        Write-Host "錯誤: $dep 未安裝" -ForegroundColor Red
        exit 1
    }
}
Write-Host ""

# 安裝 Python 依賴
Write-Host "檢查 Python 依賴..." -ForegroundColor Yellow
Set-Location "$ScriptDir\servers\fastapi"

if (-not (Test-Path ".venv")) {
    Write-Host "建立虛擬環境並安裝依賴..."
    uv sync
} else {
    Write-Host "Python 虛擬環境已存在"
}
Set-Location $ScriptDir

# 安裝 Node.js 依賴
Write-Host "檢查 Node.js 依賴..." -ForegroundColor Yellow
Set-Location "$ScriptDir\servers\nextjs"

if (-not (Test-Path "node_modules")) {
    Write-Host "安裝 npm 依賴..."
    npm install
} else {
    Write-Host "npm 依賴已存在"
}
Set-Location $ScriptDir

Write-Host ""
Write-Host "啟動服務..." -ForegroundColor Yellow
Write-Host ""

# 儲存進程
$jobs = @()

# 啟動 FastAPI 後端
Write-Host "啟動 FastAPI 後端 (port 8003)..." -ForegroundColor Blue
$jobs += Start-Job -ScriptBlock {
    Set-Location $using:ScriptDir\servers\fastapi
    $env:LLM = $using:env:LLM
    $env:OLLAMA_URL = $using:env:OLLAMA_URL
    $env:OLLAMA_MODEL = $using:env:OLLAMA_MODEL
    $env:IMAGE_PROVIDER = $using:env:IMAGE_PROVIDER
    $env:PEXELS_API_KEY = $using:env:PEXELS_API_KEY
    $env:CAN_CHANGE_KEYS = $using:env:CAN_CHANGE_KEYS
    $env:APP_DATA_DIRECTORY = $using:env:APP_DATA_DIRECTORY
    $env:USER_CONFIG_PATH = $using:env:USER_CONFIG_PATH
    $env:TEMP_DIRECTORY = $using:env:TEMP_DIRECTORY
    uv run server.py --port 8003
}

Start-Sleep -Seconds 2

# 啟動 MCP Server
Write-Host "啟動 MCP Server (port 9001)..." -ForegroundColor Blue
$jobs += Start-Job -ScriptBlock {
    Set-Location $using:ScriptDir\servers\fastapi
    $env:LLM = $using:env:LLM
    $env:OLLAMA_URL = $using:env:OLLAMA_URL
    $env:OLLAMA_MODEL = $using:env:OLLAMA_MODEL
    $env:IMAGE_PROVIDER = $using:env:IMAGE_PROVIDER
    $env:PEXELS_API_KEY = $using:env:PEXELS_API_KEY
    $env:CAN_CHANGE_KEYS = $using:env:CAN_CHANGE_KEYS
    $env:APP_DATA_DIRECTORY = $using:env:APP_DATA_DIRECTORY
    $env:USER_CONFIG_PATH = $using:env:USER_CONFIG_PATH
    $env:TEMP_DIRECTORY = $using:env:TEMP_DIRECTORY
    uv run mcp_server.py --port 9001
}

Start-Sleep -Seconds 1

# 啟動 Next.js 前端
Write-Host "啟動 Next.js 前端 (port 3001)..." -ForegroundColor Blue
$jobs += Start-Job -ScriptBlock {
    Set-Location $using:ScriptDir\servers\nextjs
    $env:NEXTJS_PORT = "3001"
    npm run dev -- -H 0.0.0.0 -p 3001
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "     所有服務已啟動!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "前端: http://localhost:3001" -ForegroundColor Cyan
Write-Host "API:  http://localhost:8003" -ForegroundColor Cyan
Write-Host "API 文檔: http://localhost:8003/docs" -ForegroundColor Cyan
Write-Host "MCP:  http://localhost:9001" -ForegroundColor Cyan
Write-Host ""
Write-Host "按 Ctrl+C 停止所有服務" -ForegroundColor Yellow
Write-Host ""

# 顯示服務輸出
try {
    while ($true) {
        foreach ($job in $jobs) {
            Receive-Job -Job $job -ErrorAction SilentlyContinue
        }
        Start-Sleep -Seconds 1

        # 檢查是否有任何 job 失敗
        $failedJobs = $jobs | Where-Object { $_.State -eq "Failed" }
        if ($failedJobs) {
            Write-Host "有服務發生錯誤" -ForegroundColor Red
            break
        }
    }
} finally {
    Write-Host ""
    Write-Host "正在停止所有服務..." -ForegroundColor Yellow
    $jobs | Stop-Job -PassThru | Remove-Job
    Write-Host "所有服務已停止" -ForegroundColor Green
}
