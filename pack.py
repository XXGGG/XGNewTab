import zipfile
import os

# 删除旧的
if os.path.exists('extension.zip'):
    os.remove('extension.zip')

# 创建新的 zip
with zipfile.ZipFile('extension.zip', 'w', zipfile.ZIP_DEFLATED) as zf:
    for root, dirs, files in os.walk('extension'):
        for file in files:
            file_path = os.path.join(root, file)
            # 去掉 'extension/' 前缀
            arcname = os.path.relpath(file_path, 'extension')
            # 使用正斜杠
            arcname = arcname.replace('\\', '/')
            zf.write(file_path, arcname)
            print(f'Added: {arcname}')

print('\nDone! extension.zip created.')
