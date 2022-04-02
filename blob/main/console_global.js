console.log('hello world');
console.log('hello %s', 'world');

const world = 'world';
console.log(`hello ${world}`);

console.error(new Error('에러 발생!!'));

const arr = [
  { name: 'chaelin', email: 'chaelin@naver.com' },
  { name: 'taejung', email: 'taejung@naver.com' },
];
console.table(arr);

const obj = {
  students: {
    grade1: {
      class1: {}, class: {}
    },
    grade2: {
      class1: {}, class: {}
    },
    teachers: [
      'chaelin', 'taejung'
    ]
  }
}

console.dir(obj, { depth: 1, colors: true }); // 출력할 오브젝트의 깊이와 콘솔 메시지 텍스트에 색상 적용

console.time('time for for-loop'); // console.timeEnd 코드 사이의 실행시간 측정
for (let i = 0; i < 99999; i++) { }
console.timeEnd('time for for-loop');
