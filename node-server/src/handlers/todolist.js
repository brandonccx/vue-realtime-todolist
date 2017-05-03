var cache = [{
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
  var d = cache.filter((data) => data.id === id)[0];
  cache.splice(cache.indexOf(d), 1);
  return d;
}

module.exports = {
  getList: getList,
  add: add,
  remove: remove
};
