"""
Trata as fotos escolhidas (Pexels, ver CREDITS.md) e gera WebP em 3 larguras para public/images.

Tratamento padrão da marca: sombras puxadas de leve para o roxo noite (#2A1065),
altas luzes um pouco mais quentes e contraste suave. Nada de filtro pesado.

Uso: python -I scripts/process-photos.py   (a partir da raiz do projeto)
"""
from pathlib import Path
from PIL import Image, ImageEnhance
import numpy as np

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "_fotos" / "candidatas"
OUT = ROOT / "public" / "images"
OUT.mkdir(parents=True, exist_ok=True)

# nome final -> (arquivo de origem, recorte relativo (x0, y0, x1, y1) ou None)
PICKS = {
    "salao": ("01-salao-escova.jpg", None),
    "salao-manicure": ("03-manicure.jpg", None),
    "barbearia": ("05-barbearia-navalha.jpg", None),
    "barbearia-maquina": ("04-barbearia-maquina.jpg", None),
    "estetica": ("07-estetica-massagem.jpg", None),
    "estetica-facial": ("06-estetica-facial.jpg", (0.18, 0.0, 1.0, 1.0)),
    "caderno": ("09-agendando-celular.jpg", None),
}
WIDTHS = [800, 1200, 1800]
NOITE = np.array([42, 16, 101], dtype=np.float32)


def treat(im: Image.Image) -> Image.Image:
    a = np.asarray(im.convert("RGB"), dtype=np.float32) / 255.0
    lum = (0.2126 * a[..., 0] + 0.7152 * a[..., 1] + 0.0722 * a[..., 2])[..., None]
    shadow = (1.0 - lum) ** 2 * 0.16  # quanto mais escuro, mais puxa para o roxo noite
    a = a * (1 - shadow) + (NOITE / 255.0) * shadow
    warm = lum ** 2 * np.array([0.025, 0.012, -0.01], dtype=np.float32)
    a = np.clip(a + warm, 0, 1)
    out = Image.fromarray((a * 255).round().astype(np.uint8))
    out = ImageEnhance.Contrast(out).enhance(1.04)
    return ImageEnhance.Color(out).enhance(0.96)


for name, (src, crop) in PICKS.items():
    im = Image.open(SRC / src)
    if crop:
        w, h = im.size
        im = im.crop((int(crop[0] * w), int(crop[1] * h), int(crop[2] * w), int(crop[3] * h)))
    im = treat(im)
    for w in WIDTHS:
        if im.width < w:
            continue
        h = round(im.height * w / im.width)
        im.resize((w, h), Image.LANCZOS).save(OUT / f"{name}-{w}.webp", "WEBP", quality=78, method=6)
    print(name, im.size)
