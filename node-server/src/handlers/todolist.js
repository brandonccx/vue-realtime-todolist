let cache = [{
  id: new Date().getTime(),
  name: 'example',
  progress: 0
}];

function getList() {
  return cache;
}

function add(data) {
  data.id = new Date().getTime();
  data.progress = 0;
  cache.push(data);
  return data;
}

function remove(id) {
  let data = {};
  cache.forEach((item, i) => {
    if (item.id === id) {
      data = cache.splice(i, 1)[0];
      return false;
    }
  })
  return data;
}

module.exports = {
  getList: getList,
  add: add,
  remove: remove
};
