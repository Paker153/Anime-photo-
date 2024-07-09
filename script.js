// Initialize Cloudinary widget
const myWidget = cloudinary.createUploadWidget({
    cloudName: 'YOUR_CLOUD_NAME', // Replace with your Cloudinary cloud name
    uploadPreset: 'YOUR_UPLOAD_PRESET' // Replace with your Cloudinary upload preset
}, (error, result) => {
    if (!error && result && result.event === "success") {
        const imageUrl = result.info.secure_url;
        // Add image URL to Firestore or any other database
        saveImageUrl(imageUrl);
    }
});

// Function to open Cloudinary widget
function uploadImage() {
    myWidget.open();
}

// Function to save image URL to database (e.g., Firestore)
function saveImageUrl(url) {
    // You can implement saving to Firestore or any other database here
    // For example, if using Firestore:
    // db.collection("images").add({
    //     url: url,
    //     timestamp: firebase.firestore.FieldValue.serverTimestamp()
    // }).then(() => {
    //     console.log("Image URL saved successfully!");
    // }).catch((error) => {
    //     console.error("Error adding document: ", error);
    // });
}

// Function to display images (if using Firestore)
function displayImages() {
    const imageGallery = document.getElementById('imageGallery');
    // Clear previous images
    imageGallery.innerHTML = '';

    // Fetch images from Firestore
    // Replace this part with your own implementation based on your database
    // db.collection("images").orderBy("timestamp", "desc").limit(10).get().then((querySnapshot) => {
    //     querySnapshot.forEach((doc) => {
    //         const data = doc.data();
    //         const imageUrl = data.url;
    //         const imgElement = document.createElement('img');
    //         imgElement.src = imageUrl;
    //         imageGallery.appendChild(imgElement);
    //     });
    // }).catch((error) => {
    //     console.error("Error getting documents: ", error);
    // });
}

// Display images initially when page loads
displayImages();
