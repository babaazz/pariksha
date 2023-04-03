module.exports = {
  forEach(collection, operation) {
    for (let i = 0; i < collection.length; i++) {
      let val = collection[i];
      operation(val, i);
    }
  },
  map(collection, operation) {
    const result = [];
    for (let i = 0; i < collection.length; i++) {
      result.push(operation(collection[i], i));
    }
    return result;
  },
};
