const assert = require("assert");
const { forEach } = require("../index");
const { genArr } = require("./helperTestFunc");

console.log("----- Testing forEach \n");

let testArr = [];

beforeEach(() => {
  testArr = [...genArr(Math.floor(Math.random() * 100))];
});

for (let i = 0; i < 3; i++) {
  it(`Test No. ${i + 1}`, () => {
    let result = 0;
    testArr.forEach((val) => {
      result = result + val;
    });
    let testResult = 0;
    forEach(testArr, (val) => {
      testResult = testResult + val;
    });
    assert.strictEqual(result, testResult);
  });
}
