"""
Gera public/og-image.png (1200x630) no estilo institucional do site: fundo noite, título em serifa
(Newsreader) e linha de apoio em Hanken Grotesk. Usa as fontes do próprio projeto (node_modules/@fontsource-variable).

Uso: python -I scripts/make-og.py
"""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parent.parent
FONTS = ROOT / "node_modules" / "@fontsource-variable"
W, H = 1200, 630
NOITE = (23, 13, 51)


def font(family: str, file: str, size: int, weight: int):
    f = ImageFont.truetype(str(FONTS / family / "files" / file), size)
    try:
        axes = f.get_variation_axes()
        values = []
        for a in axes:
            name = a.get("name", b"")
            if name in (b"Weight", "Weight"):
                values.append(weight)
            elif name in (b"Optical size", "Optical size", b"Optical Size", "Optical Size"):
                values.append(min(a["maximum"], max(a["minimum"], size * 0.75)))
            else:
                values.append(a["default"])
        f.set_variation_by_axes(values)
    except Exception:
        pass
    return f


serif = lambda s, w=400: font("newsreader", "newsreader-latin-opsz-normal.woff2", s, w)
sans = lambda s, w=400: font("hanken-grotesk", "hanken-grotesk-latin-wght-normal.woff2", s, w)

img = Image.new("RGB", (W, H), NOITE)
d = ImageDraw.Draw(img)

# Logo (versão branca, recortada do arquivo oficial)
logo = Image.open(ROOT / "scripts" / "assets" / "lockup-white.png").convert("RGBA")
logo = logo.resize((int(logo.width * 0.42), int(logo.height * 0.42)), Image.LANCZOS)
img.paste(logo, (80, 72), logo)

# Título
f1 = serif(84, 400)
y = 210
for line in ["Sua agenda enche sozinha.", "Você só atende."]:
    d.text((76, y), line, font=f1, fill=(255, 255, 255))
    y += 96

# Linha fina e apoio
d.line((80, 476, W - 80, 476), fill=(70, 58, 110), width=1)
f2 = sans(27, 400)
d.text((80, 506), "Agendamento online para salões, barbearias e clínicas de estética", font=f2, fill=(210, 204, 228))
f3 = sans(24, 500)
d.text((80, 552), "14 dias grátis, sem cartão  ·  marcaki.app", font=f3, fill=(167, 158, 196))

img.save(ROOT / "public" / "og-image.png", optimize=True)
print("og-image.png", img.size)
