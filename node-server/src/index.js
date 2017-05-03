var koa = require('koa');
var router = require('koa-router')();
var todolist = require('./handlers/todolist');
var bodyParser = require('koa-bodyparser');
var logger = require('koa-logger');

var app = new koa();

app.use(logger());
app.use(bodyParser({
  onerror (err, ctx) {
    console.log(err);
    ctx.throw('body parse error', 422);
  }
}));

router.get('/api/list', function (ctx, next) {
  ctx.body = todolist.getList();
});

router.post('/api/list', function (ctx, next) {
  ctx.body = todolist.add(ctx.request.body);
});

router.del('/api/list', function (ctx, next) {
  ctx.body = todolist.remove(ctx.request.body.id);
});

app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(3000, () => console.log('Listening at localhost:3000...'));
