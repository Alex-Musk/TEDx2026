const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const { PayOS } = require('@payos/node');

const app = express();
dotenv.config();

const payOS = new PayOS({
  clientId: process.env.PAYOS_CLIENT_ID,
  apiKey: process.env.PAYOS_API_KEY,
  checksumKey: process.env.PAYOS_CHECKSUM_KEY,
});

// Cấu hình các Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// 🔥 DÒNG QUAN TRỌNG: Cấu hình để Express tự động đọc các file trong thư mục 'public'
app.use(express.static('public'));

app.post('/create-embedded-payment-link', async (req, res) => {
  const YOUR_DOMAIN = `http://localhost:3030`; 
  
  const body = {
    orderCode: Math.floor(Math.random() * 1000000) + 1,
    amount: 10000, // Hoặc lấy số tiền từ req.body nếu bạn muốn truyền động
    description: 'ThanhToanVeTEDx2026', 
    returnUrl: `${YOUR_DOMAIN}/success.html`, 
    cancelUrl: `${YOUR_DOMAIN}/cancel.html`,  
  };

  try {
    const paymentLinkResponse = await payOS.paymentRequests.create(body);
    res.send(paymentLinkResponse);
  } catch (error) {
    console.error("Lỗi từ PayOS:", error);
    res.status(500).send('Something went error');
  }
});

// Chạy server ở cổng 3030
app.listen(3030, function () {
  console.log(`Server is listening on port 3030`);
console.log(`Tru cập giao diện tại: http://localhost:3030/seating-map.html`);
});