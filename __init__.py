import os
import random
import string
from werkzeug.utils import secure_filename
from flask import Flask, render_template, request, send_from_directory, flash, redirect
from .flip_image import get_flipped_image
from .get_save_path import get_save_path


def create_app():
    # create and configure the app
    app = Flask(__name__, instance_relative_config=True)

    upload_folder = 'raw_images'

    app.config.from_mapping(
        SECRET_KEY='dev',
        UPLOAD_FOLDER=upload_folder
    )

    # ensure the instance folder exists
    try:
        os.makedirs(app.instance_path)
    except OSError:
        pass

    @app.route('/')
    def home():
        return render_template('main.html')

    @app.route('/upload', methods=['POST'])
    def upload():
        if 'photo' not in request.files:
            flash('No photo selected')
            return redirect(request.url)

        file = request.files['photo']
        flip_mode = request.form['flip_mode']
        filename = secure_filename(file.filename)
        save_path = get_save_path(filename)

        file.save(save_path)
        reversed_image_filename = get_flipped_image(save_path, flip_mode)

        return reversed_image_filename

    @app.route('/download/<path:filename>')
    def download(filename):
        return send_from_directory('reversed_images', filename)

    return app
