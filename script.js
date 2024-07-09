function uploadImage() {
    const fileInput = document.getElementById('image-upload');
    const gallery = document.getElementById('gallery');

    const file = fileInput.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const imageUrl = e.target.result;
            const imageItem = document.createElement('div');
            imageItem.classList.add('image-item');
            imageItem.innerHTML = `<img src="${imageUrl}" alt="Uploaded Image">`;
            gallery.appendChild(imageItem);
        };
        reader.readAsDataURL(file);
    }
    fileInput.value = ''; // Clear the file input after upload
}
