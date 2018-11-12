# herhairworld web app

An e-commerce web app for mobile.

## Description

Using [Nuxt.js](https://nuxtjs.org/) and [ElementUI](https://github.com/ElemeFE/element) to build this web app.

## REF

- Mobile web app: [herhairworld](https://github.com/CNBlackJ/herhairworld) 
- Api server: [api_herhairworld](https://github.com/CNBlackJ/api_herhairworld)
- Admin management: [admin_herhairworld](https://github.com/CNBlackJ/admin_herhairworld)

## Installation

`$ git clone git@github.com:CNBlackJ/herhairworld.git`

`$ cd herhairworld`

`$ npm i`

## Get Start

Since integrate with [auth0](https://auth0.com), you have to create a `config.json` at root dir.

- ./config.json

  ```json
    {
      "AUTH0_CLIENT_ID": "your auth0 client id",
      "AUTH0_CLIENT_DOMAIN": "your auth0 client domain"
    }
  ```

`$ npm run dev`

`$ open http://localhost:5001`

After open browser, choose mobile view, or change host to your local host at `./package.json`.

```json
{
  "config": {
    "nuxt": {
      "host": "your.local.host.ip",
      "port": "5001"
    }
  },
}
```

## Update logs

- 11.12
  - 添加loadMore到产品列表
  - 添加README.md

- 11.11
  - 添加浏览器tab显示icon
  - 产品详情轮播图根据屏幕宽度1:1显示

- 11.07
  - 添加产品列表下滑刷新(Infinite scroll)

- 11.06
  - 修复产品详情页加载显示默认图

- 11.05
  - 更新首页分类跳转链接为后台配置

- 11.04
  - 添加首页faetured products
  - 更新首页分类布局

- 11.01
  - 删除产品详情页顶部固定菜单栏

- 10.31
  - 添加创建访客用户
  - 优惠券验证

- 10.29
  - 首页轮播图添加跳转页设置

- 10.28
  - 修复购物车物品数量
  - 修复paypal付款金额
  - 更新订单页

- 10.27
  - 重构购买逻辑
  - 集成paypal

- 10.26
  - 修复选择长度排序
  - 更新购买按钮逻辑
  - 增加我的订单页面

- 10.25
  - 产品查询添加online参数
  - 调试paypal按钮

- 10.22
  - 询盘页全球国家列表
  - 修复询盘国家名称

- 10.21
  - paypal沙箱测试

- 10.19
  - 添加推荐产品
  - 添加产品列表左右滑动tab

- 10.17
  - 添加搜索页

- 10.12-
  - 部署到服务器

- 10.11
  - 更新产品页布局

- 10.10
  - 添加购买页面购买概要
  - 添加立即购买按钮
  - 添加立即购买通知

- 10.09
  - 更新购物车逻辑
  - 产品详情页加入购物车逻辑优化

- 10.08
  - 更新dockerfile
  - 服务器改用cnpm

- 10.07
  - 更新启动脚本
  - 更新构建脚本

- 10.05
  - 添加产品详情页滚动监听

- 10.04
  - 添加buynow按钮

- 08.26 - 09.30
  - 初始化整个项目主体
  - 确定整体框架
  - 需求确认
  - demo搭建
  - 技术选型
