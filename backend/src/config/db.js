const path = require('node:path');
const { Pool } = require('pg');

// 실행 위치와 관계없이 프로젝트 루트의 .env를 읽습니다.
require('dotenv').config({ path: path.resolve(__dirname, '../../../.env'), quiet: true });

for (const name of ['DB_HOST', 'DB_PORT', 'DB_NAME', 'DB_USER', 'DB_PASSWORD']) {
  if (!process.env[name]) {
    throw new Error(`환경변수 ${name}을 프로젝트 루트의 .env에 설정하세요.`);
  }
}

const port = Number(process.env.DB_PORT);
if (!Number.isInteger(port) || port < 1 || port > 65535) {
  throw new Error('DB_PORT는 1부터 65535 사이의 정수여야 합니다.');
}

const pool = new Pool({
  host: process.env.DB_HOST,
  port,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  connectionTimeoutMillis: 5000,
});

pool.on('error', (error) => {
  console.error('유휴 DB 연결 오류:', error.message);
});

module.exports = pool;
