module.exports = { // customers 테이블의 데이터를 조회하는 쿼리 작성
  customerList: `select * from customers`,
  customerInsert: `insert into customers set ?`,
  customerUpdate: `update customers set ? where id=?`,
  customerDelete: `delete from customers where id=?`
}