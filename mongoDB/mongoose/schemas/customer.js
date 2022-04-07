const mongoose = require('mongoose');

const { Schema } = mongoose;
const customerSchema = new Schema({ // id 필드는 unique값이 자동으로 생성된다.
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  phone: {
    type: String,
    required: true,
    unique: true
  },
  address: {
    type: String,
  },
})

const Customer = mongoose.model('Customer', customerSchema); // 스키마를 사용해서 모델 생성 mongoose.model(스키마이름, 스키마객체)

module.exports = Customer;
