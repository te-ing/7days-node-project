const express = require('express');
const sequelize = require('./models').sequelize;
const app = express();

sequelize.sync(); // Sequelize 객체의 sync() 함수를 호출해서 모델에 정의한 테이블이 없을 때 생성해 줍니다.

const { customers } = require('./models'); // customers테이블에 대한 sequelize 모델

app.use(express.json({
  limit: '50mb' // 최대 50메가
})); // 클라이언트 요청 body를 json으로 파싱 처리

app.listen(3000, () => { // 3000번 포트로 웹 서버 실행
  console.log('Server started. http://localhost:3000');
});

app.get('/customers', async (req, res) => { 
  const customersData = await customers.findAll();  // customers 테이블의 모든 데이터 조회
  console.log(customersData);
  res.send(customersData);
});
/** 데이터 추가
const result = await customers.create({ name: 'James', email: 'james@email.com', phone: '010-2022-0407', address: '' });
  res.send(result.id);
*/
app.post('/customer/insert', async (req, res) => {
  const { name, email, phone, address } = req.body.param;
  const result = await customers.create({ name: name, email: email, phone: phone, address: address });
  res.send(result);
});

/** 데이터 업데이트
await User.update({ phone: '010-1996-0329'}{
  where: {id:2}
});
*/
app.put('/customer/update', async (req, res) => {
  const result = await customers.update(req.body.param[0], {
    where: {id: req.body.params[1]}
  });
  res.send(result); // 결과를 클라이언트로 보냄
})

/** 데이터 삭제
await customers.destroy({ 
  where: {id:id}
});
*/
app.delete('/customer/delete/:id', async (req, res) => {
  const { id } = req.params; // 라우트 경로의 :id에 맵핑되는 값
  const result = await customers.destroy({
    where: { id: id }
  });
  res.send(result); // 결과를 클라이언트로 보냄
})