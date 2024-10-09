const axios = require('axios');
const fs = require('fs');
const FormData = require('form-data');
const logger = require('./logger');

const PAGE_ID = '';
const PAGE_ACCESS_TOKEN = '';

async function uploadVideoToFacebook(videoPath, description) {
    const form = new FormData();
    form.append('file', fs.createReadStream(videoPath));
    form.append('access_token', PAGE_ACCESS_TOKEN);
    const now = new Date();
    const formattedDate = now.toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' });
    const fullDescription = `${description}\n\nDiunggah pada: ${formattedDate}`;
    form.append('description', fullDescription);

    try {
        logger.log('Starting video upload to Facebook');
        const response = await axios.post(`https://graph.facebook.com/v12.0/${PAGE_ID}/videos`, form, {
            headers: form.getHeaders()
        });
        logger.log('Video uploaded successfully to Facebook');
        logger.log(`Facebook API response: ${JSON.stringify(response.data)}`);
        return response.data;
    } catch (error) {
        if (error.response) {
            logger.error(`Error uploading video to Facebook: ${JSON.stringify(error.response.data)}`);
        } else {
            logger.error(`Error uploading video to Facebook: ${error.message}`);
        }
        throw error;
    }
}

module.exports = { uploadVideoToFacebook };