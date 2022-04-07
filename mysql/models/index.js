'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);

// MySQL 데이터베이스 연결을 위한 접속 정보를 가져오는 코드
const env = process.env.NODE_ENV || 'development'; // 노드 실행 환경 가져오기 설정값 없으면 development;
const config = require(__dirname + '/../config/config.json')[env]; // 실행 환경에 맞는 DB 접속정보 가져오기
const db = {};

// sequelize 객체를 생성하는 부분
let sequelize;
if (config.use_env_variable) { // config 정보에 use_env_variable로 정의된 값이 있는지 확인
  // .env 같은 모듈을 사용해서 환경 변수에 데이터베이스 접속 정보를 등록해서 사용한다면, 
  // use_en_variable에 정의된 값을 키로 환경변수에서 데이터베이스 접속 정보를 가져와서 Sequelize 객체 생성
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else { // config 정보에 정의된 값이 없으면
  sequelize = new Sequelize(config.database, config.username, config.password, config); // config에 있는 값을 사용해서 객체 생성
}

//models폴더에서 데이터베이스 테이블 매핑을 위한 js파일들을 가져와서 Sequelize 모델로 변환하고 db 객체에 담는 부분
fs
  .readdirSync(__dirname)
  .filter(file => { // index.js파일을 제외한 models 폴더에 있는 js 파일을 가져온다.
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes); // 모델이 정의된 .js파일을 통해서 Sequelize 모델 생성
    db[model.name] = model; // db 객체에 모델 정보 저장
  });
// 각 모델 파일에 associate() 함수가 구현되어 있다면 associate()으로 전체 모델 정보를 전달해서 associate()함수에 구현된 모델 간의 관계를 설정한다.
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
