const Koa = require("koa");
const cors = require("@koa/cors");
// const { koaBody } = require("koa-body");
const { bodyParser } = require("@koa/bodyparser");

const routes = require("../routes/routes");

const app = new Koa();

app.use(cors());
// app.use(koaBody());

function hybridBodyParser(opts) {
  const bp = bodyParser(opts);
  return async function (ctx, next) {
    ctx.request.body = ctx.request.body || ctx.req.body;
    return bp(ctx, next);
  };
}

app.use(hybridBodyParser());

app.use(routes.routes());
app.use(routes.allowedMethods());

module.exports = app;
