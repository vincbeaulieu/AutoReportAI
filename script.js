const dropArea = document.getElementById('dropArea');
const submitBtn = document.getElementById('submitBtn');
let uploadedFile = null;

dropArea.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropArea.style.backgroundColor = "#eee";
});

dropArea.addEventListener('dragleave', (e) => {
    dropArea.style.backgroundColor = "";
});

dropArea.addEventListener('drop', (e) => {
    e.preventDefault();
    dropArea.style.backgroundColor = "";
    uploadedFile = e.dataTransfer.files[0];
    if (uploadedFile) {
        displayFileIcon();
        submitBtn.disabled = false;
    }
});


function displayFileIcon() {
    const fileIcon = document.createElement('div');
    fileIcon.className = 'file-icon';
    
    const closeIcon = document.createElement('span');
    closeIcon.className = 'close-icon';
    closeIcon.innerText = 'X';
    
    closeIcon.addEventListener('click', () => {
        uploadedFile = null;
        fileIcon.remove();
        submitBtn.disabled = true;
    });
    
    fileIcon.appendChild(closeIcon);
    dropArea.appendChild(fileIcon);
}


submitBtn.addEventListener('click', () => {
    const formData = new FormData();
    formData.append('file', uploadedFile);
    fetch('https://vinc.app.n8n.cloud/webhook-test/1419d5b1-5a0d-4477-a4c9-7500e79a6bac', {
        method: 'POST',
        body: formData
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log(data);
        alert('File uploaded successfully!');
    })
    .catch(error => {
        console.log('There was a problem with the fetch operation:', error.message);
        alert('Error uploading file: ' + error.message);
    });
});

