import FileUpload from './components/FileUpload'

function App() {
  return (
    <div className="wrapper">
      <FileUpload />
      <select id="flip-type">
          <option value="vertical">Vertical</option>
          <option value="horizontal">Horizontal</option>
          <option value="both">Both</option>
      </select>
      <button id="submit">Submit</button>
      <a id="download-link" href="#">image</a>
  </div>
  );
}

export default App;
