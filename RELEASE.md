# 📦 XGNewTab 发布指南

## 🚀 快速发布（一键式）

以后每次要发布新版本到 Chrome Web Store，只需运行：

```bash
pnpm run release
```

这个命令会自动：
1. ✅ 版本号 +1 (patch: 1.0.1 -> 1.0.2)
2. ✅ 清理旧构建
3. ✅ 重新构建扩展
4. ✅ 打包成 extension.zip

然后你只需要上传 `extension.zip` 到 Chrome Web Store 即可！

---

## 📋 详细步骤

### 方式一：自动发布（推荐）

```bash
# 修复 bug 或小更新 (1.0.1 -> 1.0.2)
pnpm run release

# 新功能发布 (1.0.2 -> 1.1.0)
pnpm run version:minor && pnpm run build && python pack.py

# 重大更新 (1.1.0 -> 2.0.0)
pnpm run version:major && pnpm run build && python pack.py
```

### 方式二：手动控制

```bash
# 1. 升级版本号
pnpm run version:patch   # 1.0.1 -> 1.0.2 (bug 修复)
pnpm run version:minor   # 1.0.2 -> 1.1.0 (新功能)
pnpm run version:major   # 1.1.0 -> 2.0.0 (重大更新)

# 2. 构建扩展
pnpm run build

# 3. 打包
python pack.py
```

---

## 🔢 版本号规则

使用 [语义化版本](https://semver.org/lang/zh-CN/)：

- **Patch** (1.0.0 -> 1.0.1): Bug 修复、小改进
- **Minor** (1.0.1 -> 1.1.0): 新功能、向后兼容
- **Major** (1.1.0 -> 2.0.0): 破坏性更改、重大重构

---

## 📤 上传到 Chrome Web Store

1. 访问 [Chrome 开发者控制台](https://chrome.google.com/webstore/devconsole)
2. 找到 XGNewTab 扩展
3. 点击"上传新版本"
4. 上传 `extension.zip`
5. 填写更新说明（可选）
6. 提交审核

---

## ⚠️ 常见问题

### Q: 为什么每次上传都提示版本号重复？

**A**: Chrome Web Store 要求每次上传的版本号必须比已发布的版本更高。

**解决方法**:
- ✅ 使用 `pnpm run release` 自动升级版本
- ✅ 或手动修改 `package.json` 中的 `version` 字段

### Q: 如何查看当前版本号？

```bash
# 查看 package.json 版本
cat package.json | grep version

# 或查看构建后的 manifest.json
cat extension/manifest.json | grep version
```

### Q: 忘记升级版本号怎么办？

1. 运行 `pnpm run version:patch` 升级版本
2. 重新构建：`pnpm run build`
3. 重新打包：`python pack.py`
4. 上传新的 `extension.zip`

---

## 📝 更新日志示例

上传时可以在"What's new"中写：

```
v1.0.1
- Fixed: Removed unused 'tabs' permission
- Updated: Privacy policy documentation
- Improved: Manifest V3 compliance

v1.0.1
- 修复: 删除未使用的 'tabs' 权限
- 更新: 隐私政策文档
- 改进: Manifest V3 合规性
```

---

## 🎯 发布检查清单

每次发布前确认：

- [ ] 版本号已升级（比当前商店版本高）
- [ ] 代码已测试通过
- [ ] `pnpm run build` 成功
- [ ] `extension.zip` 已生成
- [ ] manifest.json 权限正确
- [ ] 隐私政策链接有效

---

## 🛠️ 脚本说明

| 命令 | 说明 |
|------|------|
| `pnpm run release` | 一键发布：升级版本 + 构建 + 打包 |
| `pnpm run version:patch` | 升级 patch 版本 (1.0.0 -> 1.0.1) |
| `pnpm run version:minor` | 升级 minor 版本 (1.0.0 -> 1.1.0) |
| `pnpm run version:major` | 升级 major 版本 (1.0.0 -> 2.0.0) |
| `pnpm run build` | 构建扩展 |
| `python pack.py` | 打包成 zip |

---

**现在的版本**: `1.0.1` ✅
**权限**: `storage` 仅此一项 ✅
**合规性**: 完全符合 Chrome Web Store 政策 ✅
