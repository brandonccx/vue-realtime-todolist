let cache = [{
  id: new Date().getTime(),
  name: 'example',
  progress: 0
}];

function getList(ctx, next) {
  ctx.body = cache;
}

function add(ctx, next) {
  let data = ctx.request.body;
  data.id = new Date().getTime();
  data.progress = 0;
  cache.push(data);
  ctx.io.broadcast('add', data);
  ctx.body = data;
}

function remove(ctx, next) {
  let id = ctx.request.body.id;
  let data = {};
  cache.forEach((item, i) => {
    if (item.id === id) {
      data = cache.splice(i, 1)[0];
      ctx.io.broadcast('remove', id);
      ctx.body = data;
      return false;
    }
  })
}

function run(ctx, next) {
  let id = parseInt(ctx.params.id);
  const time = (Math.random() * 10).toFixed(0);
  let t = time;
  console.log(id);
  let data = cache.filter(item => id === item.id)[0];
  let timer = setInterval(() => {
    t -= 0.5;
    if (t <= 0) {
      data.progress = 100;
      clearInterval(timer);
    }
    data.progress = (time - t) / time * 100;
    ctx.io.broadcast('update', data);
  }, 500);
  ctx.body = {status: 'OK'};
}

module.exports = {
  getList,
  add,
  remove,
  run
};
