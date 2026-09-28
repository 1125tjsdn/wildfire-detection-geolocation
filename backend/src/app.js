const express = require('express');
const routes = require('./routes');

const app = express();
app.use(express.json());
app.use('/api', routes);

app.use((req, res) => {
  res.status(404).json({ error: '요청한 API가 없습니다.' });
});

app.use((error, req, res, next) => {
  if (error.type === 'entity.parse.failed') {
    return res.status(400).json({ error: '올바른 JSON을 전송하세요.' });
  }
  if (error.type === 'entity.too.large') {
    return res.status(413).json({ error: '요청 본문이 너무 큽니다.' });
  }
  console.error('요청 처리 오류:', error.message);
  res.status(500).json({ error: '서버 내부 오류가 발생했습니다.' });
});

module.exports = app;
