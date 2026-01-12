#!/bin/bash

# Presenton 啟動腳本 (不使用 Docker)
# 使用遠端 Ollama: http://llm.leonthepro.space

set -e

# 顏色輸出
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}     Presenton 啟動腳本${NC}"
echo -e "${BLUE}========================================${NC}"

# 設定工作目錄
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

# 環境變數設定
export LLM="ollama"
export OLLAMA_URL="http://llm.leonthepro.space"
export OLLAMA_MODEL="llama3.1:8b"
export IMAGE_PROVIDER="pexels"
export PEXELS_API_KEY="6o9do1Pcf3wAjdGDWjC9HWZsU1m9wph3d2aixCiN48QTwKbdRy69CFP7"
export CAN_CHANGE_KEYS="false"
export APP_DATA_DIRECTORY="$SCRIPT_DIR/app_data"
export TEMP_DIRECTORY="/tmp/presenton"
export NEXTJS_PORT="3000"
export PUPPETEER_EXECUTABLE_PATH="$HOME/.cache/puppeteer/chrome/linux-143.0.7499.192/chrome-linux64/chrome"

# Python 虛擬環境路徑
VENV_PATH="$SCRIPT_DIR/servers/fastapi/.venv"
PYTHON="$VENV_PATH/bin/python"

# 建立必要的目錄
mkdir -p "$APP_DATA_DIRECTORY"
mkdir -p "$TEMP_DIRECTORY"

echo -e "${GREEN}環境變數設定完成:${NC}"
echo "  LLM: $LLM"
echo "  OLLAMA_URL: $OLLAMA_URL"
echo "  OLLAMA_MODEL: $OLLAMA_MODEL"
echo "  IMAGE_PROVIDER: $IMAGE_PROVIDER"
echo "  APP_DATA_DIRECTORY: $APP_DATA_DIRECTORY"
echo ""

# 檢查依賴
check_dependency() {
    if ! command -v "$1" &> /dev/null; then
        echo -e "${RED}錯誤: $1 未安裝${NC}"
        return 1
    fi
    echo -e "${GREEN}✓ $1 已安裝${NC}"
    return 0
}

echo -e "${YELLOW}檢查依賴...${NC}"
check_dependency uv || exit 1
check_dependency node || exit 1
check_dependency npm || exit 1
echo ""

# 儲存進程 PID
PIDS=()

# 清理函數
cleanup() {
    echo ""
    echo -e "${YELLOW}正在停止所有服務...${NC}"
    for pid in "${PIDS[@]}"; do
        if kill -0 "$pid" 2>/dev/null; then
            kill "$pid" 2>/dev/null || true
        fi
    done
    wait
    echo -e "${GREEN}所有服務已停止${NC}"
    exit 0
}

trap cleanup SIGINT SIGTERM

# 安裝 Python 依賴 (如果需要)
install_python_deps() {
    echo -e "${YELLOW}檢查 Python 依賴...${NC}"
    cd "$SCRIPT_DIR/servers/fastapi"

    # 檢查虛擬環境是否存在
    if [ ! -f "$PYTHON" ]; then
        echo "建立虛擬環境並安裝依賴..."
        uv sync
    fi

    # 檢查是否已安裝關鍵依賴
    if "$PYTHON" -c "import uvicorn, httpx" 2>/dev/null; then
        echo "Python 依賴已安裝"
    else
        echo "安裝 Python 依賴..."
        uv sync
    fi
    cd "$SCRIPT_DIR"
}

# 安裝 Node.js 依賴 (如果需要)
install_node_deps() {
    echo -e "${YELLOW}檢查 Node.js 依賴...${NC}"
    cd "$SCRIPT_DIR/servers/nextjs"

    if [ ! -d "node_modules" ]; then
        echo "安裝 npm 依賴..."
        npm install
    else
        echo "npm 依賴已存在"
    fi
    cd "$SCRIPT_DIR"
}

# 啟動 FastAPI 後端
start_fastapi() {
    echo -e "${BLUE}啟動 FastAPI 後端 (port 8000)...${NC}"
    cd "$SCRIPT_DIR/servers/fastapi"
    "$PYTHON" server.py --port 8000 --reload true &
    PIDS+=($!)
    cd "$SCRIPT_DIR"
}

# 啟動 MCP Server
start_mcp() {
    echo -e "${BLUE}啟動 MCP Server (port 8001)...${NC}"
    cd "$SCRIPT_DIR/servers/fastapi"
    "$PYTHON" mcp_server.py --port 8001 &
    PIDS+=($!)
    cd "$SCRIPT_DIR"
}

# 啟動 Next.js 前端
start_nextjs() {
    echo -e "${BLUE}啟動 Next.js 前端 (port 3000)...${NC}"
    cd "$SCRIPT_DIR/servers/nextjs"
    npm run dev -- -H 0.0.0.0 -p 3000 &
    PIDS+=($!)
    cd "$SCRIPT_DIR"
}

# 主程式
main() {
    # 安裝依賴
    install_python_deps
    install_node_deps

    echo ""
    echo -e "${YELLOW}啟動服務...${NC}"
    echo ""

    # 啟動所有服務
    start_fastapi
    sleep 2
    start_mcp
    sleep 1
    start_nextjs

    echo ""
    echo -e "${GREEN}========================================${NC}"
    echo -e "${GREEN}     所有服務已啟動!${NC}"
    echo -e "${GREEN}========================================${NC}"
    echo ""
    echo -e "前端: ${BLUE}http://localhost:3000${NC}"
    echo -e "API:  ${BLUE}http://localhost:8000${NC}"
    echo -e "API 文檔: ${BLUE}http://localhost:8000/docs${NC}"
    echo -e "MCP:  ${BLUE}http://localhost:8001${NC}"
    echo ""
    echo -e "${YELLOW}按 Ctrl+C 停止所有服務${NC}"
    echo ""

    # 等待任一進程結束
    wait -n "${PIDS[@]}" 2>/dev/null || true

    # 如果有進程結束，清理其他進程
    cleanup
}

main "$@"
