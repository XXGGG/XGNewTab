import { resolve } from 'node:path'
import process from 'node:process'
import fs from 'fs-extra'

// 版本类型: major (1.0.0 -> 2.0.0), minor (1.0.0 -> 1.1.0), patch (1.0.0 -> 1.0.1)
const bumpType = process.argv[2] || 'patch'

const r = (...args: string[]) => resolve(__dirname, '..', ...args)

async function bumpVersion() {
  // 读取 package.json
  const pkg = await fs.readJSON(r('package.json'))
  const currentVersion = pkg.version

  // 解析版本号
  const [major, minor, patch] = currentVersion.split('.').map(Number)

  let newVersion: string

  switch (bumpType) {
    case 'major':
      newVersion = `${major + 1}.0.0`
      break
    case 'minor':
      newVersion = `${major}.${minor + 1}.0`
      break
    case 'patch':
    default:
      newVersion = `${major}.${minor}.${patch + 1}`
      break
  }

  console.log(`📦 Bumping version: ${currentVersion} -> ${newVersion}`)

  // 更新 package.json
  pkg.version = newVersion
  await fs.writeJSON(r('package.json'), pkg, { spaces: 2 })

  console.log(`✅ Version updated to ${newVersion}`)
  console.log(`\n💡 Next steps:`)
  console.log(`   1. Run: pnpm run build`)
  console.log(`   2. Run: python pack.py`)
  console.log(`   3. Upload extension.zip to Chrome Web Store`)
}

bumpVersion().catch(console.error)
