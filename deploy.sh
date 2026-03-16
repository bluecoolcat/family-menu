#!/bin/bash
# 创建图标（使用 emoji 作为 base64 PNG）
echo "创建图标..."

# 创建简单的 192x192 和 512x512 图标（使用 SVG 转 base64）
cat > icon-192.svg << 'SVGEOF'
<svg xmlns="http://www.w3.org/2000/svg" width="192" height="192" viewBox="0 0 192 192">
  <rect width="192" height="192" fill="#FF6B6B" rx="24"/>
  <text x="96" y="120" font-size="100" text-anchor="middle">🍽️</text>
</svg>
SVGEOF

cat > icon-512.svg << 'SVGEOF'
<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
  <rect width="512" height="512" fill="#FF6B6B" rx="64"/>
  <text x="256" y="340" font-size="280" text-anchor="middle">🍽️</text>
</svg>
SVGEOF

# 检查 wrangler 是否安装
if ! command -v wrangler &> /dev/null; then
    echo "安装 wrangler..."
    npm install -g wrangler
fi

# 登录 Cloudflare（如果需要）
# wrangler login

# 检测当前分支
BRANCH_NAME=$(git branch --show-current 2>/dev/null)
if [ -z "$BRANCH_NAME" ]; then
  BRANCH_NAME="main"
fi

# 部署
echo "部署到 Cloudflare Pages..."
wrangler pages deploy . --project-name="family-menu" --branch="$BRANCH_NAME"

echo "部署完成！"
