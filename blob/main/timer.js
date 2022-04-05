const timeout = setTimeout(() => {
  console.log('1초 후에 실행');
}, 1000);

const interval = setInterval(() => { // 설정한 밀리초 마다 지정된 콜백함수 실행. setInterval 선언시 할당한 변수명으로 clearInterval(변수명)를 통해 취소 가능
  console.log('1초마다 실행')
}, 1000);

const immediate = setImmediate(() => { // setImmediate(콜백 함수): 현재 이벤트 루프 주기 끝에 코드 실행. setImmediate 선언 시 할당한 변수명을 사용하여 clearImmediate(변수명)를 통해 setImmediate를 취소할 수 있음
  console.log('setImmediate() 함수 호출 뒤에 오는 모든 코드를 먼저 실행한 뒤 실행')
});

console.log('setImmediate보다 먼저 실행')

setTimeout(() => {
  clearImmediate(interval) // 변수명이 interval인 setInterval() 함수 종료
}, 3000)