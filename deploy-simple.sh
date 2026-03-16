#!/bin/bash
# 简单部署脚本 - 使用 npx 无需全局安装

echo "🍽️ 部署家庭点菜系统到 Cloudflare Pages"
echo ""

# 检查是否已登录
if ! npx wrangler whoami &>/dev/null; then
    echo "🔐 首次使用需要登录 Cloudflare..."
    npx wrangler login
fi

echo "📦 开始部署..."
npx wrangler pages deploy . --project-name="family-menu" --branch="main"

echo ""
echo "✅ 部署完成！"
echo ""
echo "📱 访问地址：https://family-menu.pages.dev"
echo ""
echo "💡 提示："
echo "   - 首次部署可能需要几分钟生效"
echo "   - 手机浏览器打开后，可添加到主屏幕像 App 一样使用"
