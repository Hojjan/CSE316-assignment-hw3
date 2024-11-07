const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const app = express();
const port = 3001;


// CORS 설정 (React에서 요청을 허용하기 위함)
app.use(cors());

// MySQL 연결 설정
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'hochan2001!', // 실제 비밀번호로 변경
  database: 'cse316hw' // 실제 데이터베이스 이름으로 변경
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
  } else {
    console.log('Connected to MySQL');
  }
});



// 데이터 조회 API for cse316hw schema의 facilities table
app.get('/api/facilities', (req, res) => {
  const query = 'SELECT * FROM cse316hw.facilities';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).json({ error: err });
    } else {
      console.log('Query results:', results);
      res.json(results);
    }
  });
});

// 데이터 조회 API for cse316hw schema의 reservation table
app.get('/api/reservations', (req, res) => {
  const query = 'SELECT * FROM cse316hw.reservation'; 
  db.query(query, (err, results) => {
    if (err) {
      res.status(500).json({ error: err });
    } else {
      res.json(results);
    }
  });
});

// 서버 시작
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});