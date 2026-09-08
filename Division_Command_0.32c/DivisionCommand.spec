# -*- mode: python ; coding: utf-8 -*-
from pathlib import Path

root = Path(SPECPATH)

a = Analysis(
    ['launcher.py'],
    pathex=[str(root)],
    binaries=[],
    datas=[(str(root / 'web'), 'web'), (str(root / 'firewall.bat'), '.'), (str(root / 'README.txt'), '.')],
    hiddenimports=['websockets', 'websockets.asyncio', 'websockets.asyncio.server'],
    hookspath=[],
    hooksconfig={},
    runtime_hooks=[],
    excludes=[],
    noarchive=False,
)
pyz = PYZ(a.pure)

exe = EXE(
    pyz,
    a.scripts,
    [],
    exclude_binaries=True,
    name='DivisionCommand',
    debug=False,
    bootloader_ignore_signals=False,
    strip=False,
    upx=False,
    console=True,
    disable_windowed_traceback=False,
    version='file_version_info.txt',
)

coll = COLLECT(
    exe,
    a.binaries,
    a.datas,
    strip=False,
    upx=False,
    name='DivisionCommand',
)
