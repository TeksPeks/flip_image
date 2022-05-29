import os
import pathlib
from flask import current_app
from .unique_path import get_unique_path


def get_save_path(filename: str) -> str:
    save_path = os.path.join(current_app.config['UPLOAD_FOLDER'], filename)

    basedir = os.path.abspath(os.path.dirname(__file__))
    save_path = os.path.join(basedir, save_path)

    pathlib.Path(os.path.dirname(save_path)).mkdir(exist_ok=True)

    save_path = get_unique_path(save_path)

    return save_path
