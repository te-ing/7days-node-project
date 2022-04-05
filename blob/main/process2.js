const { nextTick } = require('process');

console.log('start');

setTimeout(() => {
  console.log('timeout callback');
}, 0);

nextTick(() => {
  console.log('nextTick callback');
});

console.log('end');
// Node.js의 이벤트루프는 nextTick에 인수로 전달한 콜백함수를 우선적으로 처리한다. nextTick을 통해 추가한 콜백함수는 'next tick queue'에 추가된다.
