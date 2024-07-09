// script.js
document.addEventListener('DOMContentLoaded', loadGallery);

function uploadImage() {
    const input = document.getElementById('imageInput');
    const file = input.files[0];
    if (!file) {
        alert('يرجى اختيار صورة أولاً.');
        return;
    }

    const reader = new FileReader();
    reader.onload = function(e) {
        const imageUrl = e.target.result;
        saveImage(imageUrl);
        displayImage(imageUrl);
    };
    reader.readAsDataURL(file);
}

function saveImage(url) {
    let images = localStorage.getItem('animeImages');
    images = images ? JSON.parse(images) : [];
    images.push(url);
    localStorage.setItem('animeImages', JSON.stringify(images));
}

function loadGallery() {
    let images = localStorage.getItem('animeImages');
    images = images ? JSON.parse(images) : [];
    images.forEach(url => displayImage(url));
}

function displayImage(url) {
    const gallery = document.getElementById('gallery');
    const container = document.createElement('div');
    container.className = 'image-container';

    const img = document.createElement('img');
    img.src = url;

    const downloadButton = document.createElement('button');
    downloadButton.className = 'download-button';
    downloadButton.innerText = 'تنزيل';
    downloadButton.onclick = function() {
        downloadImage(url);
    };

    container.appendChild(img);
    container.appendChild(downloadButton);
    gallery.appendChild(container);
}

function downloadImage(url) {
    const link = document.createElement('a');
    link.href = url;
    link.download = 'anime-image';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
