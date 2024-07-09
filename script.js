// Initialize Firebase (replace with your Firebase config)
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Function to upload image
function uploadImage() {
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];

    if (!file) return;

    // Upload image to Firebase Storage (optional, if using Firebase Storage)
    const storageRef = firebase.storage().ref();
    const imageRef = storageRef.child(file.name);
    imageRef.put(file).then(() => {
        // Get download URL
        imageRef.getDownloadURL().then((url) => {
            // Add image URL to Firestore
            db.collection("images").add({
                url: url,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            }).then(() => {
                // Clear input field after successful upload
                fileInput.value = '';
            }).catch((error) => {
                console.error("Error adding document: ", error);
            });
        });
    }).catch((error) => {
        console.error("Error uploading image: ", error);
    });
}

// Function to display images from Firestore
function displayImages() {
    const imageGallery = document.getElementById('imageGallery');
    // Clear previous images
    imageGallery.innerHTML = '';

    // Fetch images from Firestore
    db.collection("images").orderBy("timestamp", "desc").limit(10).get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            const imageUrl = data.url;
            const imgElement = document.createElement('img');
            imgElement.src = imageUrl;
            imageGallery.appendChild(imgElement);
        });
    }).catch((error) => {
        console.error("Error getting documents: ", error);
    });
}

// Display images initially when page loads
displayImages();
