const { Client, LocalAuth } = require('whatsapp-web.js');
const fs = require('fs');
const path = require('path');
const { uploadVideoToFacebook } = require('./facebookUploader');
const logger = require('./logger');
const axios = require('axios');
const express = require('express');
const app = express();
const port = 3000;

let qrData = '';
let isConnected = false;
let server;

const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        headless: true,
        executablePath: '/usr/bin/chromium-browser',
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    }
});

client.on('qr', async (qr) => {
    qrData = qr;
    isConnected = false;
    try {
        const response = await axios.get('https://api.ipify.org?format=json');
        const publicIP = response.data.ip;
        const endpoint = `http://${publicIP}:${port}/qr`;
        console.log(`Scan QR di endpoint: ${endpoint}`);
    } catch (error) {
        console.error('Gagal mendapatkan IP publik:', error);
    }
});

client.on('ready', () => {
    isConnected = true;
    console.log('Terhubung ke WhatsApp');
    if (server) {
        server.close(() => {
            console.log('Server ditutup karena sudah terhubung ke WhatsApp');
        });
    }
});

client.on('message', async msg => {
    const messageText = msg.body;

    if (messageText.startsWith('.upfb')) {
        let media;
        if (msg.hasMedia) {
            media = await msg.downloadMedia();
        } 
        if (!media && msg.hasQuotedMsg) {
            const quotedMsg = await msg.getQuotedMessage();
            if (quotedMsg.hasMedia) {
                media = await quotedMsg.downloadMedia();
            }
        }

        if (media) {
            try {
                const videoPath = path.resolve(__dirname, 'temp_video.mp4');
                fs.writeFileSync(videoPath, media.data, 'base64');
                const quotes = [
                    "Hidup adalah seni menggambar tanpa penghapus.",
                    "Keindahan sejati terletak pada hati yang tulus.",
                    "Setiap hari adalah kesempatan baru untuk bersinar.",
                    "Jangan pernah berhenti bermimpi, karena mimpi adalah awal dari kenyataan.",
                    "Kesuksesan adalah hasil dari kerja keras dan ketekunan.",
                    "Kebahagiaan sejati datang dari dalam diri.",
                    "Jadilah perubahan yang ingin kamu lihat di dunia.",
                    "Waktu adalah aset paling berharga yang kita miliki."
                ];
                const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

                const description = messageText.slice(6).trim() || randomQuote;
                const response = await uploadVideoToFacebook(videoPath, description);
                const videoId = response.id;
                const videoLink = `https://www.facebook.com/watch/?v=${videoId}`;
                await msg.reply(`*Video berhasil diunggah ke Facebook:*\n\n ${videoLink}`);
                await msg.react('✅');
                fs.unlinkSync(videoPath);
            } catch (error) {
                await msg.react('❌');
                await msg.reply('Gagal mengunggah video ke Facebook.');
            }
        } else {
            await msg.reply('Silakan balas atau kirim video untuk diunggah.');
            await msg.react('❌');
        }
    }
});

app.get('/qr', (req, res) => {
    const statusMessage = isConnected ? 'Sukses terhubung ke WhatsApp!' : 'Silakan scan QR code.';
    res.send(`
        <html>
            <head>
                <title>Scan QR Code</title>
            </head>
            <body style="display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; font-family: Arial, sans-serif;">
                <div style="text-align: center;">
                    <h1>Scan QR Code</h1>
                    <img src="https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(qrData)}&size=200x200" alt="QR Code" />
                    <p>${statusMessage}</p>
                </div>
            </body>
        </html>
    `);
});

server = app.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`);
});

client.initialize();