from PIL import Image
import os
import pathlib
from .unique_path import get_unique_path


def get_res_path(filename: str) -> str:
    res_path = 'reversed_images/' + filename

    basedir = os.path.abspath(os.path.dirname(__file__))
    res_path = os.path.join(basedir, res_path)

    pathlib.Path(os.path.dirname(res_path)).mkdir(exist_ok=True)

    res_path = get_unique_path(res_path)

    return res_path


def flip_image(path: str, flip_mode: str) -> Image:
    image = Image.open(path)

    if flip_mode == 'vertical':
        output = image.transpose(Image.FLIP_TOP_BOTTOM)
    elif flip_mode == 'horizontal':
        output = image.transpose(Image.FLIP_LEFT_RIGHT)
    else:
        temp = image.transpose(Image.FLIP_TOP_BOTTOM)
        output = temp.transpose(Image.FLIP_LEFT_RIGHT)

    return output


def get_flipped_image(path: str, flip_mode: str) -> str:
    flipped_img = flip_image(path, flip_mode)

    raw_img_name = os.path.basename(path)
    res_path = get_res_path(raw_img_name)

    flipped_img.save(res_path)

    return raw_img_name
