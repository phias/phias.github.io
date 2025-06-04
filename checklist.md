# 📋 Markdown 部落格系統部署檢查清單

## 🗂️ 檔案結構檢查

### ✅ 核心檔案
- [x] `article.html` - 文章模板頁面
- [x] `blog-engine.js` - 部落格引擎核心
- [x] `script.js` - 更新版主要 JavaScript（整合新功能）
- [x] `style.css` - 包含文章頁面樣式的完整 CSS

### ✅ 更新的頁面
- [x] `index.html` - 使用新連結格式的首頁
- [x] `blog.html` - 整合 Markdown 系統的部落格頁面
- [x] `portfolio.html` - 保持原樣
- [x] `casestudy.html` - 保持原樣

### ✅ 資料夾結構
```
your-website/
├── article.html
├── blog-engine.js
├── script.js
├── style.css
├── index.html
├── blog.html
├── portfolio.html
├── casestudy.html
├── blog/
│   └── posts/
│       ├── exchangestudent-0.md
│       ├── exchangestudent-1.md
│       └── exchangestudent-2.md
├── img/
│   └── (你的圖片檔案)
└── (其他現有檔案)
```

## 📝 文章檔案準備

### ✅ 示例文章檔案
- [ ] `blog/posts/exchangestudent-0.md` - 交換申請經驗分享
- [ ] `blog/posts/exchangestudent-1.md` - 簽證、開戶等實用資訊（草稿）
- [ ] `blog/posts/exchangestudent-2.md` - 波蘭郵寄經驗分享

### ✅ Front Matter 檢查
每篇 `.md` 文章檔案都應該包含：
```yaml
---
title: "文章標題"
date: "YYYY-MM-DD"
category: "分類名稱"
tags: ["標籤1", "標籤2"]
description: "文章描述"
readTime: "X 分鐘閱讀"
status: "published" # 或 "draft"
city: "城市" # 可選
country: "國家" # 可選
---
```

## 🔧 設定檢查

### ✅ blog-engine.js 配置
在 `blog-engine.js` 中確認 `postsConfig` 陣列包含所有文章：
```javascript
this.postsConfig = [
    'exchangestudent-0.md',
    'exchangestudent-1.md',
    'exchangestudent-2.md',
    // 添加更多文章檔名
];
```

### ✅ CDN 連結檢查
確認以下 CDN 連結可正常存取：
- [ ] Google Fonts: `https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@400;700&display=swap`
- [ ] Material Icons: `https://fonts.googleapis.com/icon?family=Material+Icons`
- [ ] Marked.js: `https://cdnjs.cloudflare.com/ajax/libs/marked/13.0.2/marked.min.js`

### ✅ Google Analytics
- [ ] 確認 GA 追蹤 ID `G-H5KNZ3T763` 是否正確
- [ ] 或替換為你自己的 GA 追蹤 ID

## 🔗 連結更新檢查

### ✅ 新連結格式
將所有舊的 `.html` 文章連結更新為新格式：
```html
<!-- 舊格式 -->
<a href="./exchangestudent-0.html">文章標題</a>

<!-- 新格式 -->
<a href="./article.html?post=exchangestudent-0">文章標題</a>
```

### ✅ 需要更新連結的檔案
- [ ] `index.html` - 首頁的文章連結
- [ ] `blog.html` - 部落格頁面的文章連結
- [ ] 其他可能包含文章連結的頁面

## 🎨 樣式檢查

### ✅ CSS 樣式整合
確認 `style.css` 包含以下新增樣式：
- [ ] 載入畫面樣式 (`.loading-screen`)
- [ ] 錯誤頁面樣式 (`.error-screen`)
- [ ] 文章頁面樣式 (`.article-page`, `.article-content` 等)
- [ ] 文章 Bento Grid 樣式 (`.article-bento-grid`)
- [ ] 目錄樣式 (`.toc-container`, `.toc-list`)
- [ ] 響應式設計調整

### ✅ 響應式測試
- [ ] 桌面版 (>1024px)
- [ ] 平板版 (768px-1024px)
- [ ] 手機版 (<768px)

## 🚀 功能測試

### ✅ 基本功能
- [ ] 首頁載入正常
- [ ] 部落格頁面載入正常
- [ ] 文章頁面載入正常
- [ ] 導覽選單在所有裝置上正常運作

### ✅ 文章系統功能
- [ ] 文章載入和渲染
- [ ] 目錄自動生成
- [ ] 相關文章推薦
- [ ] 上下篇導航
- [ ] 分享功能

### ✅ 互動功能
- [ ] 平滑滾動
- [ ] 返回頂部按鈕
- [ ] Coming soon 文章點擊提示
- [ ] 手機版選單開關

### ✅ 部落格頁面特殊功能
- [ ] 動態文章載入
- [ ] 載入更多按鈕
- [ ] 分類篩選
- [ ] 標籤篩選
- [ ] 篩選重置

## 📱 瀏覽器相容性

### ✅ 測試瀏覽器
- [ ] Chrome (最新版)
- [ ] Firefox (最新版)
- [ ] Safari (最新版)
- [ ] Edge (最新版)
- [ ] 手機瀏覽器 (iOS Safari, Android Chrome)

### ✅ JavaScript 功能
- [ ] ES6 語法支援
- [ ] Fetch API 支援
- [ ] Promise/Async 支援

## 🔍 SEO 檢查

### ✅ Meta 標籤
- [ ] 每個頁面的 title 標籤
- [ ] Meta description
- [ ] Meta keywords
- [ ] Open Graph 標籤
- [ ] Twitter Card 標籤

### ✅ 結構化資料
- [ ] 文章頁面的 JSON-LD 結構化資料

### ✅ 連結和導覽
- [ ] 麵包屑導覽
- [ ] 內部連結結構
- [ ] 相關文章連結

## 📊 分析和監控

### ✅ Google Analytics
- [ ] 頁面瀏覽追蹤
- [ ] 事件追蹤（文章點擊）
- [ ] 自訂維度設置

### ✅ 效能監控
- [ ] 頁面載入時間
- [ ] JavaScript 錯誤監控
- [ ] 使用者體驗指標

## 🗃️ 內容管理

### ✅ 文章撰寫流程
1. 在 `blog/posts/` 建立新的 `.md` 檔案
2. 撰寫 Front Matter 和文章內容
3. 更新 `blog-engine.js` 中的 `postsConfig` 陣列
4. 測試文章載入和顯示
5. 部署到網站

### ✅ 圖片管理
- [ ] 圖片放在 `img/` 資料夾
- [ ] 使用相對路徑引用：`./img/your-image.jpg`
- [ ] 圖片最佳化（壓縮、WebP 格式）

## 🛡️ 安全性檢查

### ✅ 基本安全
- [ ] HTTPS 連線
- [ ] Content Security Policy (如需要)
- [ ] 防止 XSS 攻擊（Marked.js 預設已處理）

## 📤 部署前最終檢查

### ✅ 測試流程
1. [ ] 在本地環境完整測試所有功能
2. [ ] 檢查所有連結都正常運作
3. [ ] 確認手機版顯示正常
4. [ ] 測試文章載入速度
5. [ ] 驗證 Google Analytics 追蹤正常

### ✅ 備份
- [ ] 備份原有網站檔案
- [ ] 準備 rollback 方案

### ✅ 部署步驟
1. [ ] 上傳所有新檔案和更新的檔案
2. [ ] 建立 `blog/posts/` 資料夾結構
3. [ ] 上傳文章 Markdown 檔案
4. [ ] 測試線上環境功能
5. [ ] 檢查 Google Analytics 數據

## 🎯 上線後檢查

### ✅ 功能驗證
- [ ] 所有頁面載入正常
- [ ] 文章連結正確
- [ ] 搜尋引擎能正常索引
- [ ] 社交媒體分享正常

### ✅ 效能檢查
- [ ] 頁面載入速度 (<3 秒)
- [ ] 圖片載入最佳化
- [ ] CSS/JS 檔案壓縮

## 🔮 未來擴展規劃

### ✅ 可選功能
- [ ] 搜尋功能
- [ ] RSS 訂閱
- [ ] 留言系統
- [ ] 深色模式
- [ ] 多語言支援

### ✅ 效能最佳化
- [ ] 檔案快取
- [ ] CDN 設定
- [ ] 圖片懶載入
- [ ] Service Worker

---

## 🚨 常見問題排除

### Q: 文章載入失敗
**檢查：**
1. 檔案路徑是否正確
2. Markdown 語法是否有誤
3. Front Matter 格式是否正確
4. `postsConfig` 是否包含該檔案

### Q: 樣式顯示異常
**檢查：**
1. CSS 檔案是否完整載入
2. 是否有 CSS 語法錯誤
3. 瀏覽器快取是否需要清除

### Q: JavaScript 功能不正常
**檢查：**
1. 瀏覽器開發者工具的 Console 錯誤
2. 檔案載入順序是否正確
3. CDN 連結是否可存取

---

**完成這個檢查清單後，你的 Markdown 部落格系統就可以順利上線了！** ✨

記得在部署前先在測試環境完整驗證所有功能。