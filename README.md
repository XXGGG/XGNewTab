<div align="center">
  <img src="./src/assets/XGNewTab.svg" width="120" height="120" alt="XGNewTab Logo">
  <h1>XGNewTab</h1>
  <p>Customize your browser's new tab page</p>

  <p>
    English | <a href="./README-cmn_CN.md">简体中文</a> | <a href="./README-cmn_TW.md">繁體中文</a> | <a href="./README-jyut.md">粵語</a>
  </p>
</div>

---

## Introduction

XGNewTab is a simple browser extension that allows you to customize your new tab page. When you open a new tab, it will automatically redirect to your specified URL.

<!-- Screenshots -->
<div align="center">
  <img src="XGNewTab.png" alt="Screenshot" width="600">
</div>

## Features

- Set any URL as your new tab page
- Instant redirect, no flicker
- Simple and clean interface
- Auto-save settings
- URL validation

## Installation

### Chrome Web Store
Click here: [Chrome Web Store - XGNewTab](https://chromewebstore.google.com/detail/xgnewtab/kefmpjgpgaenhafgpekmeokbbepladfd?hl=zh-cn)

### Edge Add-ons
Click here: [Edge Add-ons - XGNewTab](https://microsoftedge.microsoft.com/addons/detail/xgnewtab/hgopfokppklholomjognciddfdihligk?hl=zh-CN)

### Manual Installation

1. Download the latest release from [Releases](https://github.com/XXGGG/XGNewTab/releases)
2. Unzip the downloaded file
3. Open Chrome and go to `chrome://extensions/`
4. Enable "Developer mode" in the top right corner
5. Click "Load unpacked" and select the unzipped folder

## Usage

1. Click the XGNewTab icon in the browser toolbar
2. Enter your desired URL (e.g., `https://google.com`)
3. The URL will be saved automatically
4. Open a new tab to see the result

## Build from Source

```bash
# Install dependencies
pnpm install

# Development
pnpm dev

# Build for production
pnpm build

# Package as zip
pnpm pack:zip
```

## License

MIT License

## Author

[XXGGG](https://github.com/XXGGG)
