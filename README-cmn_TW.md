<div align="center">
  <img src="./src/assets/XGNewTab.svg" width="120" height="120" alt="XGNewTab Logo">
  <h1>XGNewTab</h1>
  <p>自訂瀏覽器新分頁</p>

  <p>
    <a href="./README.md">English</a> | <a href="./README-cmn_CN.md">简体中文</a> | 繁體中文 | <a href="./README-jyut.md">粵語</a>
  </p>
</div>

---

## 介紹

XGNewTab 是一個簡單的瀏覽器擴充功能，讓你可以自訂新分頁。當你開啟新分頁時，它會自動跳轉到你指定的網址。

<!-- 截圖 -->
<div align="center">
  <img src="XGNewTab.png" alt="截圖" width="600">
</div>

## 功能特點

- 將任意網址設為新分頁
- 即時跳轉，無閃爍
- 簡潔清爽的介面
- 自動儲存設定
- 網址格式驗證

## 安裝

### Chrome 線上應用程式商店

<!-- TODO: 新增 Chrome 商店連結 -->
即將上線...

### Edge 附加元件

<!-- TODO: 新增 Edge 商店連結 -->
即將上線...

### 手動安裝

1. 從 [Releases](https://github.com/XXGGG/XGNewTab/releases) 下載最新版本
2. 解壓縮下載的檔案
3. 開啟 Chrome，前往 `chrome://extensions/`
4. 在右上角啟用「開發人員模式」
5. 點擊「載入未封裝項目」，選擇解壓縮後的資料夾

## 使用方法

1. 點擊瀏覽器工具列中的 XGNewTab 圖示
2. 輸入你想要的網址（例如：`https://google.com`）
3. 網址會自動儲存
4. 開啟新分頁查看效果

## 從原始碼建置

```bash
# 安裝依賴
pnpm install

# 開發模式
pnpm dev

# 正式建置
pnpm build

# 打包為 zip
pnpm pack:zip
```

## 授權條款

MIT License

## 作者

[XXGGG](https://github.com/XXGGG)
