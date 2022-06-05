import React from 'react';
import Dropzone from 'react-dropzone';
import classnames from 'classnames';
import UploadImage from '../../assets/uploadImage.png';
import './index.css';

const FileUpload = ({ photo, setPhoto, loading, disabled }) => {
  const onDrop = acceptedFiles => {
    const newPhoto = acceptedFiles[0];
    newPhoto.preview = URL.createObjectURL(newPhoto);
    setPhoto(newPhoto);
  };

  const classes = classnames(
    'drop-area',
    photo && 'drop-area--selected',
    loading && 'drop-area--loading',
    disabled && 'drop-area--disabled'
  );
  console.log(loading);
  return (
        <Dropzone disabled={disabled} multiple={false} accept={{ 'image/*': ['.jpeg', '.png', '.jpg'] }} onDrop={onDrop}>
            {({ getRootProps, getInputProps }) => (
                <div {...getRootProps({
                  className: classes
                })}>
                    {photo
                      ? (
                        <figure className='selected-image'>
                            <img src={photo.preview} alt={photo.name} />
                            <figcaption>{photo.name}</figcaption>
                        </figure>
                        )
                      : (
                        <>
                            <input {...getInputProps()} />
                            <h1>Drop your image here...</h1>
                            <img
                                className='upload-image'
                                src={UploadImage}
                                alt="Upload"
                            />
                        </>
                        )}
                </div>
            )}
        </Dropzone>
  );
};

export default FileUpload;
