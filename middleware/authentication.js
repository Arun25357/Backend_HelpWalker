const express = require('express');
const app = express();

// Middleware บันทึกการเรียก API
const loggerMiddleware = (req, res, next) => {
    console.log(`${req.method} ${req.url} at ${new Date().toISOString()}`);
    next(); // เรียก next() เพื่อให้ไปยัง middleware หรือ route ถัดไป
};

// ใช้ Middleware
app.use(loggerMiddleware);

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.listen(3000, () => console.log('Server is running on port 3000'));
