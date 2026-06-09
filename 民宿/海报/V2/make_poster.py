from pathlib import Path
import textwrap

from PIL import Image, ImageDraw, ImageFilter, ImageFont, ImageOps


ROOT = Path(__file__).parent
ASSETS = ROOT / "assets"
DIST = ROOT / "dist"
OUT = DIST / "poster-v2-01.png"

W, H = 1080, 1920
BLUE = (31, 122, 166)
DARK = (26, 53, 67)
MUTED = (93, 118, 130)
BG = (245, 250, 252)
WHITE = (255, 255, 255)


def font(size, bold=False):
    candidates = [
        "/mnt/c/Windows/Fonts/msyhbd.ttc" if bold else "/mnt/c/Windows/Fonts/msyh.ttc",
        "/mnt/c/Windows/Fonts/simhei.ttf",
        "/mnt/c/Windows/Fonts/simsun.ttc",
    ]
    for path in candidates:
        if Path(path).exists():
            return ImageFont.truetype(path, size)
    return ImageFont.load_default()


F_TITLE = font(68, True)
F_SUB = font(34)
F_H2 = font(36, True)
F_CARD = font(28, True)
F_TEXT = font(22)
F_SMALL = font(20)


def cover(path, size, focus=(0.5, 0.5)):
    img = ImageOps.exif_transpose(Image.open(path)).convert("RGB")
    iw, ih = img.size
    tw, th = size
    scale = max(tw / iw, th / ih)
    nw, nh = int(iw * scale), int(ih * scale)
    img = img.resize((nw, nh), Image.Resampling.LANCZOS)
    x = int((nw - tw) * focus[0])
    y = int((nh - th) * focus[1])
    return img.crop((x, y, x + tw, y + th))


def rounded_mask(size, radius):
    mask = Image.new("L", size, 0)
    ImageDraw.Draw(mask).rounded_rectangle((0, 0, size[0], size[1]), radius, fill=255)
    return mask


def paste_round(base, img, xy, radius=34, shadow=True):
    x, y = xy
    if shadow:
        sh = Image.new("RGBA", img.size, (0, 0, 0, 60))
        sh.putalpha(rounded_mask(img.size, radius).filter(ImageFilter.GaussianBlur(14)))
        base.alpha_composite(sh, (x, y + 10))
    layer = img.convert("RGBA")
    layer.putalpha(rounded_mask(img.size, radius))
    base.alpha_composite(layer, xy)


def gradient(size, top, bottom):
    w, h = size
    img = Image.new("RGBA", size)
    px = img.load()
    for yy in range(h):
        t = yy / max(h - 1, 1)
        color = tuple(int(top[i] * (1 - t) + bottom[i] * t) for i in range(4))
        for xx in range(w):
            px[xx, yy] = color
    return img


def horizontal_gradient(size, left, right):
    w, h = size
    img = Image.new("RGBA", size)
    px = img.load()
    for xx in range(w):
        t = xx / max(w - 1, 1)
        color = tuple(int(left[i] * (1 - t) + right[i] * t) for i in range(4))
        for yy in range(h):
            px[xx, yy] = color
    return img


def text(draw, xy, value, fnt, fill=DARK, spacing=8):
    draw.multiline_text(xy, value, font=fnt, fill=fill, spacing=spacing)


def wrapped(value, width):
    return "\n".join(textwrap.wrap(value, width=width))


def card(base, box, img_path, title, body, focus=(0.5, 0.5)):
    x, y, w, h = box
    bg = Image.new("RGBA", (w, h), WHITE + (255,))
    ImageDraw.Draw(bg).rounded_rectangle((0, 0, w - 1, h - 1), 34, fill=WHITE)
    photo_h = int(h * 0.62)
    photo = cover(img_path, (w, photo_h), focus)
    bg.alpha_composite(photo.convert("RGBA"), (0, 0))
    fade = gradient((w, 70), (255, 255, 255, 0), (255, 255, 255, 255))
    bg.alpha_composite(fade, (0, photo_h - 70))
    d = ImageDraw.Draw(bg)
    d.text((28, photo_h - 4), title, font=F_CARD, fill=DARK)
    d.text((28, photo_h + 44), wrapped(body, 18), font=F_TEXT, fill=MUTED, spacing=6)
    paste_round(base, bg, (x, y), 34, True)


def pill(draw, xy, value):
    x, y = xy
    pad_x, pad_y = 20, 10
    box = draw.textbbox((0, 0), value, font=F_SMALL)
    w = box[2] - box[0] + pad_x * 2
    h = box[3] - box[1] + pad_y * 2
    draw.rounded_rectangle((x, y, x + w, y + h), h // 2, fill=(231, 246, 251))
    draw.text((x + pad_x, y + pad_y - 2), value, font=F_SMALL, fill=BLUE)


def main():
    DIST.mkdir(exist_ok=True)
    base = Image.new("RGBA", (W, H), BG + (255,))
    draw = ImageDraw.Draw(base)

    hero = cover(ASSETS / "DSC_9107.jpg", (W, 780), (0.45, 0.42)).convert("RGBA")
    base.alpha_composite(hero, (0, 0))
    base.alpha_composite(gradient((W, 300), (245, 250, 252, 0), (245, 250, 252, 255)), (0, 520))
    base.alpha_composite(horizontal_gradient((620, 780), (255, 255, 255, 0), (255, 255, 255, 225)), (460, 0))

    draw.rounded_rectangle((584, 78, 1016, 318), 34, fill=(255, 255, 255, 220))
    text(draw, (624, 116), "朝汐里·\n海边小院", F_TITLE, DARK, 4)
    draw.text((628, 264), "住进海边，推窗见海", font=F_SUB, fill=BLUE)

    pill(draw, (66, 682), "海景房型")
    pill(draw, (222, 682), "露台看海")
    pill(draw, (378, 682), "海岛慢生活")

    draw.text((64, 808), "房型与空间", font=F_H2, fill=DARK)
    draw.text((64, 854), "原图展示，保留真实房间与海景质感", font=F_TEXT, fill=MUTED)
    card(base, (64, 908, 456, 390), ASSETS / "DSC_9511.jpg", "海景双床房", "双床配置，窗边看海，适合亲友同行。", (0.55, 0.48))
    card(base, (560, 908, 456, 390), ASSETS / "DSC_9533.jpg", "舒适大床房", "大床房型，独立卫浴，空间清爽。", (0.48, 0.45))
    card(base, (64, 1330, 456, 328), ASSETS / "ef0d664eb7e43fb8b317c7a710ed6143.jpg", "海景阳台", "近海阳台视野，适合放空休憩。", (0.5, 0.5))
    card(base, (560, 1330, 456, 328), ASSETS / "DSC_8984.jpg", "公共客厅", "石墙、原木、绿植，温暖小院氛围。", (0.5, 0.5))

    draw.rounded_rectangle((64, 1692, 1016, 1848), 34, fill=(255, 255, 255, 235))
    left = cover(ASSETS / "DJI_20260531085732_0146_D.jpg", (286, 124), (0.46, 0.48))
    right = cover(ASSETS / "DJI_20260531090304_0159_D_1.jpg", (286, 124), (0.55, 0.5))
    paste_round(base, left, (88, 1708), 24, False)
    paste_round(base, right, (398, 1708), 24, False)
    base.alpha_composite(horizontal_gradient((110, 124), (255, 255, 255, 0), (255, 255, 255, 235)), (610, 1708))
    draw.text((704, 1722), "周边风景", font=F_H2, fill=DARK)
    draw.text((704, 1770), "悬崖海岸｜海岛渔港｜露台看海", font=F_TEXT, fill=MUTED)
    draw.text((704, 1808), "蓝白清爽 · 原木暖调 · 石墙小院", font=F_SMALL, fill=BLUE)

    draw.text((64, 1884), "朝汐里·海边小院", font=F_SMALL, fill=(92, 126, 139))
    draw.text((820, 1884), "民宿介绍海报 V2", font=F_SMALL, fill=(140, 160, 168))

    base.convert("RGB").save(OUT, quality=95)


if __name__ == "__main__":
    main()
