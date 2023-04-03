const randGen = (range) => {
  return Math.floor(Math.random() * range);
};

const genArr = (length) => {
  const arr = [];
  for (let i = 0; i < length; i++) {
    arr.push(randGen(100));
  }
  return arr;
};

module.exports = { randGen, genArr };
