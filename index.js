const express = require('express');
const axios = require('axios');
const app = express();
app.use(express.json());

const TELEGRAM_TOKEN = '7672420309:AAFOdybZROzwD-C9y1_jNpqU20U7Du4bGuU'; // توکن ربات رو اینجا بذارید
const N8N_WEBHOOK_URL = 'https://telegram-bot-1-mm3w.onrender.com'; // بعداً این رو پر می‌کنید

app.post(`/bot${TELEGRAM_TOKEN}`, async (req, res) => {
  const message = req.body.message;
  if (message && message.photo) {
    const fileId = message.photo[message.photo.length - 1].file_id;
    const fileUrl = `https://api.telegram.org/bot${TELEGRAM_TOKEN}/getFile?file_id=${fileId}`;
    const fileResponse = await axios.get(fileUrl);
    const filePath = fileResponse.data.result.file_path;
    const imageUrl = `https://api.telegram.org/file/bot${TELEGRAM_TOKEN}/${filePath}`;

    // ارسال تصویر به n8n
    await axios.post(N8N_WEBHOOK_URL, { imageUrl });
  }
  res.sendStatus(200);
});

app.listen(3000, () => console.log('Webhook server running'));
