// api/remove-bg.js

import axios from 'axios';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { imageFile } = req.body;  // Assuming the frontend sends the image file
        const REMOVE_BG_API_KEY = process.env.REMOVE_BG_API_KEY;  // Use the environment variable

        try {
            const formData = new FormData();
            formData.append('image_file', imageFile);
            formData.append('size', 'auto');

            // Send a POST request to remove.bg
            const response = await axios.post('https://api.remove.bg/v1.0/removebg', formData, {
                headers: {
                    'X-Api-Key': REMOVE_BG_API_KEY,
                },
                responseType: 'arraybuffer',
            });

            // Send the image back to the frontend
            res.setHeader('Content-Type', 'image/png');
            res.send(response.data);

        } catch (error) {
            console.error(error);
            res.status(500).send('Failed to remove background');
        }
    } else {
        res.status(405).send('Method Not Allowed');
    }
}
