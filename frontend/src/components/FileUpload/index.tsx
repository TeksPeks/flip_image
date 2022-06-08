import React from 'react';
import Dropzone from 'react-dropzone';
import classnames from 'classnames';
import UploadImage from '../../assets/uploadImage.png';
import './index.css';

const FileUpload = ({ photo, setPhoto, setPreview, preview, loading, disabled }: {
  photo: File | null;
  setPhoto: (photo: File) => void;
  setPreview: (url: string) => void;
  preview: string;
  loading: boolean;
  disabled: boolean;
}): JSX.Element => {
  const onDrop = <T extends File>(acceptedFiles: T[]) => {
    const newPhoto = acceptedFiles[0];
    setPreview(URL.createObjectURL(newPhoto));
    setPhoto(newPhoto);
  };

  const classes = classnames(
    'drop-area',
    photo && 'drop-area--selected',
    loading && 'drop-area--loading',
    disabled && 'drop-area--disabled'
  );

  return (
        <Dropzone disabled={disabled} multiple={false} accept={{ 'image/*': ['.jpeg', '.png', '.jpg'] }} onDrop={onDrop}>
            {({ getRootProps, getInputProps }) => (
                <div {...getRootProps({
                  className: classes
                })}>
                    {photo
                      ? (
                        <figure className='selected-image'>
                            <img src={preview} alt={photo.name} />
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
