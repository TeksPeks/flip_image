import os
import random
import string


def get_unique_path(path: str) -> str:
    unique_path = path

    while os.path.exists(unique_path):
        new_filename, save_ext = os.path.splitext(unique_path)
        new_filename += random.choice(string.ascii_letters + string.digits)
        unique_path = new_filename + save_ext

    return unique_path
