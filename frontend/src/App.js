import FileUpload from './components/FileUpload'
import downloadIcon from './assets/download.png'
import './app.css'
import { useState } from 'react'

const serverPath = 'https://myroslav-image-flip.herokuapp.com'

function App() {
  const [type, setType] = useState('');
  const [resultLink, setResultLink] = useState('')
  const [photo, setPhoto] = useState(null)
  const [resultReady, setResultReady] = useState(false)
  const [loading, setLoading] = useState(false);

  const getReversedImage = () => {
    if (!photo) {
      alert('choose image to flip')
      return;
    }
    if (!type) {
      alert('choose flip type')
      return;
    }

    let formData = new FormData();

    formData.append("photo", photo);
    formData.append("flip_mode", type);

    setLoading(true);

    fetch(`${serverPath}/upload`, {method: "POST", body: formData}).then(res => res.text()).then(filename => {
        const newResLink = `${serverPath}/download/${filename}`;
        setResultLink(newResLink);
        const newPhoto = {...photo};
        newPhoto.preview = newResLink;
        newPhoto.name = filename;
        setPhoto(newPhoto);
        setLoading(false);
        setResultReady(true);
    })
  }

  const reset = () => {
    setPhoto(null);
    setType('');
    setResultLink('');
    setResultReady(false);
  }


  return (
    <div className="wrapper">
      <h1 className="heading">FLIP IMAGE</h1>
      <FileUpload photo={photo} setPhoto={val => setPhoto(val)} loading={loading} disabled={resultReady} />
      {!resultReady ? (
      <>
        <select className="select" value={type} onChange={e => setType(e.target.value)}>
            <option value="" disabled hidden>Choose flip mode...</option>
            <option value="vertical">Vertical</option>
            <option value="horizontal">Horizontal</option>
            <option value="both">Both</option>
        </select>
        <button className="button" onClick={getReversedImage}>Submit</button>
      </>
      ) : (
        <>
          <button className='button' onClick={reset}>submit another image</button>
          <a id="download" className="download button" href={resultLink} download="result"><span>download result</span><img src={downloadIcon} alt="" /></a>
        </>
      )}
      <div className="info">All rights reserved by me, 2022 ©</div>
  </div>
  );
}

export default App;
