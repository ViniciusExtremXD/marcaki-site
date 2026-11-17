"""
Gera public/og-image.png (1200x630) no estilo da marca: roxo noite, assinatura com marca-texto
e a grade de horários. Usa as fontes do próprio projeto (node_modules/@fontsource-variable).

Uso: python -I scripts/make-og.py
"""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont
import numpy as np

ROOT = Path(__file__).resolve().parent.parent
FONTS = ROOT / "node_modules" / "@fontsource-variable"
W, H = 1200, 630
NOITE, ROXO, MARCA, TINTA = (42, 16, 101), (124, 58, 237), (255, 225, 77), (15, 17, 35)


def font(family: str, file: str, size: int, weight: int):
    f = ImageFont.truetype(str(FONTS / family / "files" / file), size)
    try:
        axes = f.get_variation_axes()
        values = [weight if a.get("name", b"") in (b"Weight", "Weight") else a["default"] for a in axes]
        f.set_variation_by_axes(values)
    except Exception:
        pass
    return f


display = lambda s, w=800: font("bricolage-grotesque", "bricolage-grotesque-latin-wght-normal.woff2", s, w)
inter = lambda s, w=500: font("inter", "inter-latin-wght-normal.woff2", s, w)

# Fundo: roxo noite com brilho radial
yy, xx = np.mgrid[0:H, 0:W]
glow = np.exp(-(((xx - 980) / 520) ** 2 + ((yy - 120) / 420) ** 2))
bg = np.array(NOITE, dtype=np.float32)[None, None, :] * (1 - glow[..., None] * 0.55) + np.array(ROXO, dtype=np.float32)[None, None, :] * glow[..., None] * 0.55
img = Image.fromarray(bg.clip(0, 255).astype(np.uint8), "RGB")
d = ImageDraw.Draw(img)

# Logo (versão branca, recortada do arquivo oficial)
logo = Image.open(ROOT / "scripts" / "assets" / "lockup-white.png").convert("RGBA")
logo = logo.resize((int(logo.width * 0.5), int(logo.height * 0.5)), Image.LANCZOS)
img.paste(logo, (72, 64), logo)

# Assinatura
f1 = display(104, 800)
x, y = 72, 196
d.text((x, y), "Marcou,", font=f1, fill=(255, 255, 255))
y2 = y + 112
txt = "tá marcado."
bbox = d.textbbox((x, y2), txt, font=f1)
d.rounded_rectangle((bbox[0] - 10, bbox[1] + 8, bbox[2] + 12, bbox[3] + 10), radius=6, fill=MARCA)
d.text((x, y2), txt, font=f1, fill=TINTA)

# Linha de apoio
f2 = inter(30, 500)
d.text((74, 452), "Agenda online para salão, barbearia e estética.", font=f2, fill=(226, 215, 253))
f3 = inter(24, 600)
d.text((74, 520), "14 dias grátis · sem cartão · marcaki.app", font=f3, fill=(200, 178, 251))

# Grade de horários (direita)
fh = font("bricolage-grotesque", "bricolage-grotesque-latin-wght-normal.woff2", 24, 700)
hours = ["09:00", "09:45", "10:30", "11:15", "13:00", "13:45", "14:30", "15:15", "16:00", "16:45", "17:30", "18:15"]
state = {1: "roxo", 2: "roxo", 4: "roxo", 7: "marca", 9: "roxo", 10: "roxo"}
gx, gy, cw, ch, gap = 820, 196, 108, 52, 14
for i, h in enumerate(hours):
    c, r = i % 3, i // 3
    x0, y0 = gx + c * (cw + gap), gy + r * (ch + gap)
    s = state.get(i)
    if s == "roxo":
        d.rounded_rectangle((x0, y0, x0 + cw, y0 + ch), radius=26, fill=ROXO)
        col = (255, 255, 255)
    elif s == "marca":
        d.rounded_rectangle((x0, y0, x0 + cw, y0 + ch), radius=26, fill=MARCA)
        col = TINTA
    else:
        d.rounded_rectangle((x0, y0, x0 + cw, y0 + ch), radius=26, outline=(110, 80, 190), width=2)
        col = (200, 178, 251)
    tb = d.textbbox((0, 0), h, font=fh)
    d.text((x0 + (cw - (tb[2] - tb[0])) / 2 - tb[0], y0 + (ch - (tb[3] - tb[1])) / 2 - tb[1]), h, font=fh, fill=col)

img.save(ROOT / "public" / "og-image.png", optimize=True)
print("og-image.png", img.size)
