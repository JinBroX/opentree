# 宽树香品 · 项目说明

## 快速启动

### 方法一（推荐）
双击 `启动服务器.bat`，服务器会在 http://localhost:3001 启动。

然后在浏览器打开：http://localhost:3001

### 方法二
```bash
cd server
node index.js
```

## 目录结构

```
kuanshu/
├── server/            # 后端 Express 服务
│   ├── index.js       # 服务器主文件
│   ├── package.json
│   └── data/          # NeDB 数据库文件（自动生成）
│       ├── users.db
│       ├── orders.db
│       └── carts.db
├── public/            # 前端静态文件（由后端托管）
│   ├── index.html     # 主页
│   ├── css/main.css   # 样式
│   ├── js/main.js     # 前端逻辑
│   └── assets/images/ # 图片资源
└── 启动服务器.bat     # Windows 一键启动
```

## 功能清单

- **首页** · Hero 大图 + 品牌理念 + 产品区 + 工艺介绍 + 评价
- **产品详情** · 弹窗展示配料表 / 生产工艺 / 使用方法 / 产品故事
- **用户系统** · 注册 / 登录 / 修改资料 / 退出
- **购物车** · 添加商品 / 修改数量 / 删除 / 价格合计
- **下单结算** · 填写收货信息 / 提交订单
- **订单查询** · 用户中心查看历史订单
- **响应式** · 完整适配手机 / 平板 / 桌面

## 三款产品

| 产品 | 价格 | 特点 |
|------|------|------|
| 宽树·沉香线香 | ¥268/盒 | 越南芽庄天然沉香，60支/盒 |
| 宽树·檀香盘香 | ¥198/盒 | 印度老山檀+云南白檀，12盘/盒 |
| 宽树·艾草净化香 | ¥128/包 | 南阳陈艾+白鼠尾草，20支/包 |

## API 端点

| 方法 | 路径 | 说明 |
|------|------|------|
| GET | /api/products | 获取产品列表 |
| GET | /api/products/:id | 获取产品详情 |
| POST | /api/auth/register | 注册 |
| POST | /api/auth/login | 登录 |
| GET | /api/auth/me | 获取当前用户信息 |
| GET | /api/cart | 获取购物车 |
| POST | /api/cart | 添加商品到购物车 |
| PUT | /api/cart/:productId | 更新购物车数量 |
| DELETE | /api/cart/:productId | 删除购物车商品 |
| POST | /api/orders | 创建订单 |
| GET | /api/orders | 获取订单列表 |
