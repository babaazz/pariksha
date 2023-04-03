const { genArr } = require("./helperTestFunc");
const assert = require("assert");
const { map } = require("../index.js");

console.log("----- Testing map\n");

let testArr = [];
beforeEach(() => {
  testArr = [...genArr(Math.floor(Math.random() * 100))];
});

for (let i = 0; i < 3; i++) {
  it(`Test No. ${i + 1}`, () => {
    const result = testArr.map((n) => n * 2);
    const testResult = map(testArr, (n) => n * 2);
    assert.deepStrictEqual(result, testResult);
  });
}
