#!/bin/bash
# 简单部署脚本 - 使用 npx 无需全局安装

echo "🍽️ 部署家庭点菜系统到 Cloudflare Pages"
echo ""

BRANCH_NAME=$(git branch --show-current 2>/dev/null)
if [ -z "$BRANCH_NAME" ]; then
    BRANCH_NAME="main"
fi

# 检查是否已登录
if ! npx wrangler whoami &>/dev/null; then
    echo "🔐 首次使用需要登录 Cloudflare..."
    npx wrangler login
fi

echo "📦 开始部署..."
npx wrangler deploy

echo ""
echo "✅ 部署完成！"
echo ""
echo "📱 访问地址：查看 wrangler deploy 输出中的 workers.dev 或自定义域名"
echo ""
echo "💡 提示："
echo "   - 首次切换到 Durable Object 同步时，会自动创建迁移"
echo "   - 手机浏览器打开后，可添加到主屏幕像 App 一样使用"
