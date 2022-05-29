import os
import random
import string
import pathlib
from flask import current_app


def get_save_path(filename: str) -> str:
    save_path = os.path.join(current_app.config['UPLOAD_FOLDER'], filename)

    basedir = os.path.abspath(os.path.dirname(__file__))
    save_path = os.path.join(basedir, save_path)

    pathlib.Path(os.path.dirname(save_path)).mkdir(exist_ok=True)

    while os.path.exists(save_path):
        new_filename, save_ext = os.path.splitext(save_path)
        new_filename += random.choice(string.ascii_letters + string.digits)
        save_path = new_filename + save_ext

    return save_path
