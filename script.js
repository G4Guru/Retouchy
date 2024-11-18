let imageURL;

document.getElementById('file').addEventListener('change', async function () {
    const fileInput = document.getElementById('file');
    const image = fileInput.files[0];

    document.querySelector('.custum-file-upload').style.display = 'none';
    document.querySelector('.p').style.display = 'none';
    document.querySelector('.removing').style.display = '';

    // Multipart file
    const formData = new FormData();
    formData.append('imageFile', image);  // Sending the file to the serverless function

    try {
        const response = await fetch('/api/remove-bg', {
            method: 'POST',
            body: formData,
        });

        if (response.ok) {
            const blob = await response.blob();
            const url = URL.createObjectURL(blob);
            imageURL = url;
            const resultImage = document.getElementById('resultImage');
            resultImage.src = url;
            document.querySelector('.removing').style.display = 'none';
            document.querySelector('.result').style.display = '';
        } else {
            throw new Error('Failed to process image');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Failed to remove background. Please try again.');
    }
});

function downloadFile() {
    if (!imageURL) {
        alert("No image to download!");
        return;
    }
    var a = document.createElement('a');
    a.href = imageURL;
    a.download = 'background_removed_image.png';
    document.body.appendChild(a);

    a.click();

    document.body.removeChild(a);
}
