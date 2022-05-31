from PIL import Image
import os
from .path_utils import get_res_path


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
