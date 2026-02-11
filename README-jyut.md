<div align="center">
  <img src="./src/assets/XGNewTab.svg" width="120" height="120" alt="XGNewTab Logo">
  <h1>XGNewTab</h1>
  <p>自訂瀏覽器新標籤頁</p>

  <p>
    <a href="./README.md">English</a> | <a href="./README-cmn_CN.md">简体中文</a> | <a href="./README-cmn_TW.md">繁體中文</a> | 粵語
  </p>
</div>

---

## 介紹

XGNewTab 係一個簡單嘅瀏覽器擴充程式，畀你可以自訂新標籤頁。當你開新標籤頁嘅時候，佢會自動跳轉去你指定嘅網址。

<!-- 截圖 -->
<div align="center">
  <img src="XGNewTab.png" alt="截圖" width="600">
</div>

## 功能特點

- 將任意網址設做新標籤頁
- 即時跳轉，冇閃爍
- 簡潔清爽嘅介面
- 自動儲存設定
- 網址格式驗證

## 安裝

### Chrome 網上應用程式商店
撳呢度：[Chrome應用商店 - XGNewTab](https://chromewebstore.google.com/detail/xgnewtab/kefmpjgpgaenhafgpekmeokbbepladfd?hl=zh-cn)

### Edge 附加元件
撳呢度：[Edge擴充商店 - XGNewTab](https://microsoftedge.microsoft.com/addons/detail/xgnewtab/hgopfokppklholomjognciddfdihligk?hl=zh-CN)

### 手動安裝

1. 喺 [Releases](https://github.com/XXGGG/XGNewTab/releases) 下載最新版本
2. 解壓下載嘅檔案
3. 開 Chrome，去 `chrome://extensions/`
4. 喺右上角開啟「開發人員模式」
5. 撳「載入未封裝項目」，揀解壓之後嘅資料夾

## 點用

1. 撳瀏覽器工具列入面嘅 XGNewTab 圖示
2. 輸入你想要嘅網址（例如：`https://google.com`）
3. 網址會自動儲存
4. 開新標籤頁睇下效果

## 由原始碼建置

```bash
# 安裝依賴
pnpm install

# 開發模式
pnpm dev

# 正式建置
pnpm build

# 打包做 zip
pnpm pack:zip
```

## 授權條款

MIT License

## 作者

[XXGGG](https://github.com/XXGGG)
