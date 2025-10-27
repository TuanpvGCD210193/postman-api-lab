// server.js
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 5000;

app.use(cors());

// === API 1: Lấy tất cả FAQs ===
app.get('/api/faqs', (req, res) => {
  const faqsPath = path.join(__dirname, 'faqs.json');
  fs.readFile(faqsPath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Loi doc file" });
    }
    const faqs = JSON.parse(data);
    // Cố tình trả về 1 header để chúng ta test
    res.header('X-Source', 'Local-File');
    res.status(200).json(faqs);
  });
});

// === API 2: Lấy 1 FAQ theo ID ===
app.get('/api/faqs/:id', (req, res) => {
   const faqsPath = path.join(__dirname, 'faqs.json');
   fs.readFile(faqsPath, 'utf8', (err, data) => {
     if (err) {
        return res.status(500).json({ error: "Loi doc file" });
     }
     const faqs = JSON.parse(data);
     const faq = faqs.find(f => f.id === parseInt(req.params.id));

     if (!faq) {
        // Test trường hợp 404
        return res.status(404).json({ error: "Khong tim thay FAQ" });
     }
     res.status(200).json(faq);
   });
});

// === API 3: Health Check (Yêu cầu của lab trước) ===
app.get('/health', (req, res) => {
  res.status(200).json({ status: "ok", message: "API is healthy" });
});

app.listen(PORT, () => {
  console.log(`API Server (cho Postman Lab) dang chay tai http://localhost:${PORT}`);
});