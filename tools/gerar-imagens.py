# Gera og-padrao.png, logo-512.png, apple-touch-icon.png e favicon.ico (rodar uma vez).
import pathlib, subprocess
from playwright.sync_api import sync_playwright
raiz = pathlib.Path(__file__).resolve().parent.parent
with sync_playwright() as p:
    b = p.chromium.launch(executable_path='/usr/bin/google-chrome')
    for nome, w, h, destino in [('og.html',1200,630,'public/assets/og/og-padrao.png'),('logo.html',512,512,'public/assets/logo-512.png')]:
        pg = b.new_page(viewport={'width':w,'height':h})
        pg.goto((raiz/'tools'/nome).as_uri()); pg.wait_for_timeout(300)
        pg.screenshot(path=str(raiz/destino))
    b.close()
subprocess.run(['convert', str(raiz/'public/assets/logo-512.png'), '-resize','180x180', str(raiz/'public/apple-touch-icon.png')], check=True)
subprocess.run(['convert', str(raiz/'public/assets/logo-512.png'), '-define','icon:auto-resize=48,32,16', str(raiz/'public/favicon.ico')], check=True)
print('ok')
