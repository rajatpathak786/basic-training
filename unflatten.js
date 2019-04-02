function unflatten(flatObject) {
  const temp = {};
  for(let key in flatObject) {
    let array = key.split('.');
    const obj = function(obj1, array, count) {
    if(count < (array.length - 1)) {
      if(typeof obj1[array[count]] == "object") {
        obj(obj1[array[count]], array, count + 1);
      }else {
        obj1[array[count]]={};
        obj(obj1[array[count]], array, count + 1);
      }
    }else {
      obj1[array[count]] = flatObject[key];
    }

    return obj1;            
    }

    obj(temp, array, 0);
  }

  return temp;
}
