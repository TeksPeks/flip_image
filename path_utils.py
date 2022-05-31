import os
import pathlib
from flask import current_app
import random
import string

def get_save_path(filename: str) -> str:
    save_path = os.path.join(current_app.config['UPLOAD_FOLDER'], filename)

    basedir = os.path.abspath(os.path.dirname(__file__))
    save_path = os.path.join(basedir, save_path)

    pathlib.Path(os.path.dirname(save_path)).mkdir(exist_ok=True)

    save_path = get_unique_path(save_path)

    return save_path


def get_unique_path(path: str) -> str:
    unique_path = path

    while os.path.exists(unique_path):
        new_filename, save_ext = os.path.splitext(unique_path)
        new_filename += random.choice(string.ascii_letters + string.digits)
        unique_path = new_filename + save_ext

    return unique_path


def get_res_path(filename: str) -> str:
    res_path = 'reversed_images/' + filename

    basedir = os.path.abspath(os.path.dirname(__file__))
    res_path = os.path.join(basedir, res_path)

    pathlib.Path(os.path.dirname(res_path)).mkdir(exist_ok=True)

    res_path = get_unique_path(res_path)

    return res_path
