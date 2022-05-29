const submitButton = document.getElementById("submit")
const downloadLink = document.getElementById("download-link")
const typeSelect = document.getElementById("flip-type")

submitButton.addEventListener('click', () => {
    let photo = document.getElementById("fileInput").files[0]
    let formData = new FormData();

    formData.append("photo", photo);
    formData.append("flip_mode", typeSelect.value)

    fetch('/upload', {method: "POST", body: formData}).then(res => res.text()).then(filename => {
        downloadLink.setAttribute('href', `download/${filename}`);
        downloadLink.setAttribute('download', 'result');
    })
})