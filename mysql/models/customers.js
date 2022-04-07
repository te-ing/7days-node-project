'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class customers extends Model { // Sequelize 모델을 상속받아서 customers 클래스 생성
    /**
     * models/index.js에서 자동으로 호출되는 함수
     * 테이블 간에 외래키를 통해서 연관 관계를 설정하는 것과 같이 필요한 경우 현재 모델에서 다른 모델과의 연관 관계를 정의한다.
     */
    static associate(models) {
      // 전체 모델을 파라미터로 받아서 현재 모델과 연관 관계를 정의해야 하는 모델이 있다면 여기서 정의합니다.
    }
  }
  customers.init({ // 테이블의 컬럼에 해당하는 필드를 정의
    name: {type: DataTypes.STRING, allowNull: false},
    email: {type: DataTypes.STRING, allowNull: false},
    phone: {type: DataTypes.STRING, allowNull: false},
    address: {type: DataTypes.STRING, allowNull: true}
  }, {
    sequelize,
    timestamps: false, // createdAt, updatedAt 컬럼 없음 (sequelize-cli를 이용해 생성한 모델은 timestamps를 사용하지 않아도 기본값으로 자동으로 컬럼을 사용하는 것으로 인식하기때문에 
    // createdAt, updatedAt 컬럼이 없는 customers 테이블에서는 임의로 false를 설정해야 한다.)
    modelName: 'customers', // 모델 이름
  });
  return customers;
};