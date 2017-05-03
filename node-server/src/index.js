var path = require('path');
var Koa = require('koa');
var router = require('koa-router')();
var todolist = require('./handlers/todolist');
var bodyParser = require('koa-bodyparser');
var logger = require('koa-logger');
var IO = require('koa-socket');
var stat = require('koa-static');

const app = new Koa();
const io = new IO();

app.use(logger());
app.use(stat(path.resolve(__dirname, '../..', 'web/dist')));
app.use(bodyParser({
  onerror (err, ctx) {
    console.log(err);
    ctx.throw('body parse error', 422);
  }
}));

io.attach(app);

io.on('connection', (ctx, data) => {
  console.log('joined websocket', data);
});

app.use((ctx, next) => {
  ctx.io = io;
  next();
});

router.get('/api/list', (ctx, next) => {
  todolist.getList(ctx, next);
});

router.post('/api/list', (ctx, next) => {
  todolist.add(ctx, next);
});

router.del('/api/list', (ctx, next) => {
  todolist.remove(ctx, next);
});

router.post('/api/list/run/:id', (ctx, next) => {
  todolist.run(ctx, next);
});

app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(3000, () => console.log('Listening at localhost:3000...'));
