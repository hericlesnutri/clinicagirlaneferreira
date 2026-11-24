"""Converte as fotos da clínica para o site.

Uso:  python3 tools/importar-fotos.py <pasta-com-as-fotos>

A pasta de origem deve ter subpastas com estes nomes (os arquivos podem ser jpg, png ou webp):
  equipe/        girlane.jpg, hericles.jpg, diva.jpg
  clinica/       fachada.jpg, recepcao.jpg, sala-1.jpg, hero.jpg ...
  tratamentos/   <slug-do-tratamento>.jpg   (ex.: harmonizacao-facial.jpg)
  antes-depois/  <slug>-<n>-antes.jpg  e  <slug>-<n>-depois.jpg

O script: reduz para no máximo 1600 px, converte para WebP, REMOVE os metadados
(localização GPS, celular, data) e grava em public/img/, atualizando o manifest.json.
O par antes/depois é recortado para o mesmo tamanho, para o comparador alinhar.
"""
import sys, json, pathlib, re
from PIL import Image, ImageOps

origem = pathlib.Path(sys.argv[1])
raiz = pathlib.Path(__file__).resolve().parent.parent
destino = raiz / 'public' / 'img'
manifest_arq = destino / 'manifest.json'
manifest = json.loads(manifest_arq.read_text()) if manifest_arq.exists() else {}
EXT = {'.jpg', '.jpeg', '.png', '.webp'}
MAX = 1600

def slugify(t):
    import unicodedata
    t = unicodedata.normalize('NFKD', t).encode('ascii', 'ignore').decode().lower()
    return re.sub(r'[^a-z0-9]+', '-', t).strip('-')

def abrir(arq):
    im = ImageOps.exif_transpose(Image.open(arq))  # gira conforme o celular e depois descarta o EXIF
    return im.convert('RGB')

def salvar(im, rel):
    im.thumbnail((MAX, MAX), Image.LANCZOS)
    out = destino / rel
    out.parent.mkdir(parents=True, exist_ok=True)
    im.save(out, 'WEBP', quality=82, method=6)   # sem exif/icc: metadados removidos
    manifest[rel_key(rel)] = [im.width, im.height]
    print(f'  ✓ {rel}  {im.width}x{im.height}  {out.stat().st_size // 1024} KB')

rel_key = lambda rel: 'img/' + str(rel).replace('\\', '/')

for pasta in ['equipe', 'clinica', 'tratamentos']:
    for arq in sorted((origem / pasta).glob('*')) if (origem / pasta).exists() else []:
        if arq.suffix.lower() in EXT:
            salvar(abrir(arq), pathlib.Path(pasta) / (slugify(arq.stem) + '.webp'))

ad = origem / 'antes-depois'
if ad.exists():
    arqs = {slugify(a.stem): a for a in ad.glob('*') if a.suffix.lower() in EXT}
    for nome, arq in sorted(arqs.items()):
        m = re.match(r'(.+)-(\d+)-antes$', nome)
        if not m: continue
        par = arqs.get(f'{m[1]}-{m[2]}-depois')
        if not par:
            print(f'  ! sem "depois" para {arq.name}'); continue
        a, d = abrir(arq), abrir(par)
        # mesmo enquadramento: recorta os dois para a menor proporção comum e mesmo tamanho
        w, h = min(a.width, d.width), min(a.height, d.height)
        a, d = ImageOps.fit(a, (w, h)), ImageOps.fit(d, (w, h))
        salvar(a, pathlib.Path('antes-depois') / f'{m[1]}-{m[2]}-antes.webp')
        salvar(d, pathlib.Path('antes-depois') / f'{m[1]}-{m[2]}-depois.webp')

manifest_arq.write_text(json.dumps(dict(sorted(manifest.items())), indent=1))
print(f'manifest: {len(manifest)} imagens')
