const timeout = setTimeout(() => {
  console.log('1초 후에 실행');
}, 1000);

const interval = setInterval(() => {
  console.log('1초마다 실행')
}, 1000);

const immediate = setImmediate(() => {
  console.log('setImmediate() 함수 호출 뒤에 오는 모든 코드를 먼저 실행한 뒤 실행')
});

console.log('setImmediate보다 먼저 실행')

setTimeout(() => {
  clearImmediate(interval) // 변수명이 interval인 setInterval() 함수 종료
}, 3000)