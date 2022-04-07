const express = require("express");
const mongodb = require("./mongoose"); // mogoose 폴더의 index.js
const Customer = require("./mongoose/schemas/customer");

const app = express();

mongodb.connect(); // MongoDB 연결

app.listen(3000, () => {
  console.log(("Sever started. port 3000."));
});

app.get("/customers", async (req, res) => {
  const customers = await Customer.find(); // 별도 조회조건없이 customers 컬렉션이 모든 문서 조회
  console.log(customers);
});

