const express = require('express')
const app = express()
const port = 3000 // 포트번호

// 클라이언트에서 HTTP 요청 메소드 중 GET 을 이용해서 'host:port'로 요청을 보내면 실행되는 라우트
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/about', (req, res) => {
  res.send('about')
})

// app.listen() 함수를 사용해 서버를 실행
// 클라이언트는 'host:port'로 노드 서버에 요청을 보낼 수 있다.
app.listen(port, () => {
  console.log(`서버가 실행됩니다. http://localhost:${port}`)
})
