import React, { useState } from 'react';
import FileUpload from './components/FileUpload';
import Popup from './components/Popup';
import downloadIcon from './assets/download.png';
import './app.css';

const serverPath = 'https://myroslav-image-flip.herokuapp.com';

function App () {
  const [type, setType] = useState('');
  const [resultLink, setResultLink] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [resultReady, setResultReady] = useState(false);
  const [loading, setLoading] = useState(false);
  const [popupMessage, setPopupMessage] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  const validateInput = () => {
    if (!photo) {
      return 'choose image to flip';
    }
    if (!type) {
      return 'choose flip mode';
    }

    return null;
  };

  const popup = message => {
    setPopupMessage(message);
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 3000);
  };

  const getFormData = () => {
    const formData = new FormData();

    formData.append('photo', photo);
    formData.append('flip_mode', type);

    return formData;
  };

  const getReversedImageFilename = async formData => {
    const res = await fetch(`${serverPath}/upload`, { method: 'POST', body: formData });
    const filename = await res.text();

    return filename;
  };

  const updatePhotoContent = filename => {
    const newResLink = `${serverPath}/download/${filename}`;
    setResultLink(newResLink);
    const newPhoto = { ...photo };
    newPhoto.preview = newResLink;
    newPhoto.name = filename;
    setPhoto(newPhoto);
  };

  const getReversedImage = () => {
    const validationMessage = validateInput();

    if (validationMessage) {
      popup(validationMessage);
      return;
    }

    setLoading(true);
    const formData = getFormData();
    const filename = getReversedImageFilename(formData);

    updatePhotoContent(filename);

    setLoading(false);
    setResultReady(true);
  };

  const reset = () => {
    setPhoto(null);
    setType(null);
    setResultLink(null);
    setResultReady(false);
  };

  return (
    <div className="wrapper">
      <h1 className="heading">FLIP IMAGE</h1>
      <FileUpload photo={photo} setPhoto={val => setPhoto(val)} loading={loading} disabled={resultReady} />
      {!resultReady
        ? (
      <div className='options-container'>
        <label htmlFor="mode-select" className="select-label">Choose flip mode</label>
        <select id="mode-select" className="select" value={type} onChange={e => setType(e.target.value)}>
            <option value="" hidden disabled>...</option>
            <option value="vertical">Vertical</option>
            <option value="horizontal">Horizontal</option>
            <option value="both">Both</option>
        </select>
        <button className="button" onClick={getReversedImage}>Submit</button>
      </div>
          )
        : (
        <>
          <button className='button' onClick={reset}>submit another image</button>
          <a id="download" className="download button" href={resultLink} download="result"><span>download result</span><img src={downloadIcon} alt="" /></a>
        </>
          )}
      <Popup message={popupMessage} isVisible={showPopup} onClose={() => setShowPopup(false)} />
      <div className="info">All rights reserved by me, 2022 ©</div>
  </div>
  );
}

export default App;
