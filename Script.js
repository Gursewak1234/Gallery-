document.getElementById('uploadForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const file = document.getElementById('imageInput').files[0];
    const reader = new FileReader();
    
    reader.onloadend = async () => {
        const base64Image = reader.result;

        // Upload image to Netlify Function
        const response = await fetch('/.netlify/functions/upload-image', {
            method: 'POST',
            body: JSON.stringify({ image: base64Image }),
            headers: { 'Content-Type': 'application/json' }
        });
        
        const result = await response.json();
        if (result.url) {
            displayImage(result.url);
        } else {
            alert('Image upload failed');
        }
    };
    
    reader.readAsDataURL(file);
});

function displayImage(url) {
    const gallery = document.getElementById('gallery');
    const img = document.createElement('img');
    img.src = url;
    gallery.appendChild(img);
}
