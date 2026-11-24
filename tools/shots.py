import pathlib
from playwright.sync_api import sync_playwright
r = pathlib.Path('dist-preview').resolve()
out = pathlib.Path('/home/claude/shots'); out.mkdir(exist_ok=True)
with sync_playwright() as p:
    b = p.chromium.launch(executable_path='/usr/bin/google-chrome')
    for nome, arq, w, h, scheme, full in [
        ('home-desk','index.html',1440,900,'light',True),
        ('home-dark','index.html',1440,900,'dark',False),
        ('servico-desk','tratamentos/harmonizacao-facial.html',1440,900,'light',True),
        ('home-mobile','index.html',390,844,'light',False),
        ('artigo-mobile','conteudo/toxina-botulinica-ou-preenchimento.html',390,844,'dark',False),
    ]:
        c = b.new_context(viewport={'width':w,'height':h}, color_scheme=scheme, device_scale_factor=1)
        pg = c.new_page(); pg.goto((r/arq).as_uri()); pg.wait_for_timeout(300)
        pg.screenshot(path=str(out/f'{nome}.png'), full_page=full)
    b.close()
