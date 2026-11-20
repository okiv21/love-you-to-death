#!/usr/bin/env python3
"""Install browser MCPs after Node LTS and Chrome are installed."""
import datetime, json, os, pathlib, shutil, subprocess, sys, tomllib
npm = shutil.which('npm')
node = shutil.which('node')
chrome = pathlib.Path('/Applications/Google Chrome.app/Contents/MacOS/Google Chrome')
if not npm or not node or not chrome.exists():
    sys.exit('Install Node.js LTS from https://nodejs.org and Google Chrome from https://www.google.com/chrome/ first. Then run this script again.')
config = pathlib.Path.home() / '.codex/config.toml'
original = config.read_text() if config.exists() else ''
parsed = tomllib.loads(original)
servers = parsed.get('mcp_servers', {})
if any(name in servers for name in ('playwright', 'chrome_devtools', 'playcanvas')):
    sys.exit('An existing browser MCP entry was found. No configuration changed; inspect it before rerunning.')
install = pathlib.Path.home() / '.local/share/browser-mcps'
install.mkdir(parents=True, exist_ok=True)
subprocess.run([npm, 'install', '--prefix', str(install), '@playwright/mcp@latest', 'chrome-devtools-mcp@latest', '@playcanvas/editor-mcp-server@latest', '--fetch-retries=0', '--fetch-timeout=30000'], check=True)
envpath = str(pathlib.Path(node).parent) + os.pathsep + os.environ.get('PATH', '')
addition = ''
for name, executable, args in [
    ('playwright', 'playwright-mcp', ['--browser', 'chrome', '--isolated']),
    ('chrome_devtools', 'chrome-devtools-mcp', ['--no-usage-statistics', '--no-performance-crux']),
    ('playcanvas', 'playcanvas-editor-mcp', [])
]:
    binary = install / 'node_modules/.bin' / executable
    if not binary.exists():
        sys.exit(f'Missing installed executable: {binary}')
    subprocess.run([node, '--check', str(binary.resolve())], check=True)
    if name != 'playcanvas':
        subprocess.run([str(binary), '--help'], check=True, stdout=subprocess.DEVNULL, timeout=30)
    addition += f'\n[mcp_servers.{name}]\ncommand = {json.dumps(str(binary))}\nargs = {json.dumps(args)}\nstartup_timeout_sec = 60\n\n[mcp_servers.{name}.env]\nPATH = {json.dumps(envpath)}\n'
updated = original + addition
tomllib.loads(updated)
config.parent.mkdir(parents=True, exist_ok=True)
if config.exists():
    backup = config.with_name('config.toml.backup-' + datetime.datetime.now().strftime('%Y%m%d-%H%M%S'))
    shutil.copy2(config, backup)
if (config.read_text() if config.exists() else '') != original:
    sys.exit('Configuration changed during installation; refusing to overwrite it.')
config.write_text(updated)
print('All three packages installed and entry-point syntax checked. Browser MCP CLI startup checked; PlayCanvas connection still needs verification. Codex configuration updated. Restart Codex, then verify both MCP connections. Browser automation has not yet been tested.')
