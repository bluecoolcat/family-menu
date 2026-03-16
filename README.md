# 🍽️ 今天吃什么 - 家庭点菜系统

## 快速开始

### 方式一：本地打开（最快）
```bash
# Mac
open index.html

# 或启动本地服务器
python3 -m http.server 8080
# 然后访问 http://localhost:8080
```

### 方式二：部署到 Cloudflare Pages

#### 步骤 1：创建 Cloudflare 账户
访问 https://dash.cloudflare.com/sign-up 注册（免费）

#### 步骤 2：创建 API Token
1. 访问 https://dash.cloudflare.com/profile/api-tokens
2. 点击 "Create Token"
3. 选择 "Custom token"
4. 权限设置：
   - Zone:Read, Zone:Edit
   - Account:Read
   - Cloudflare Pages:Edit
5. 复制 Token

#### 步骤 3：部署
```bash
export CLOUDFLARE_API_TOKEN=你的token
npx wrangler pages deploy . --project-name="family-menu"
```

#### 步骤 4：获取链接
部署成功后会显示类似：
```
✨ Successfully published your script to:
https://family-menu.pages.dev
```

### 方式三：使用 npx 临时部署
```bash
# 安装依赖
npm install -g wrangler

# 登录（浏览器会打开授权页面）
wrangler login

# 部署
wrangler pages deploy . --project-name="family-menu"
```

## 使用方法

1. **老婆/老公打开链接** → 看到今日菜单
2. **点击"点菜"** → 选择想吃的菜（可多选）
3. **点击"确认点菜"** → 保存到今日菜单
4. **另一方刷新页面** → 看到已点的菜，可继续补充
5. **点击"购物清单"** → 自动生成食材清单

## 功能特点

- ✅ 无数量限制点菜
- ✅ 同一链接共享状态
- ✅ 实时同步（刷新即可）
- ✅ 随机推荐（"随便"按钮）
- ✅ 分类筛选（快手/周末/汤/主食）
- ✅ 购物清单一键复制
- ✅ PWA支持，可添加到手机桌面
- ✅ 离线可用

## 预置菜品（20道）

**快手菜**：番茄炒蛋、青椒肉丝、麻婆豆腐、炒花菜、豆芽炒牛肉、酸辣土豆丝、地三鲜、雪菜炒笋、水煮虾

**周末菜**：红烧肉、红烧鲫鱼、糖醋排骨、可乐鸡翅、红烧鱼块

**汤羹**：番茄鸡蛋汤、紫菜蛋花汤、玉米排骨汤、腌笃鲜

**主食**：蛋炒饭

## 数据存储

所有数据保存在浏览器 LocalStorage 中：
- `dishes` - 菜品库
- `todayMenu` - 今日菜单
- `history` - 历史记录（7天）

清除浏览器数据会丢失记录。

## 自定义菜品

编辑 `index.html` 中的 `defaultDishes` 数组即可添加/修改菜品：

```javascript
{
  id: 21,
  name: '新菜品',
  emoji: '🍜',
  category: 'quick',  // quick/weekend/soup/staple
  time: '15分钟',
  ingredients: ['食材1', '食材2']
}
```

## 技术栈

- HTML5 + Tailwind CSS
- Vanilla JavaScript
- LocalStorage 数据持久化
- Service Worker 离线支持
- Cloudflare Pages 部署

## License

MIT
