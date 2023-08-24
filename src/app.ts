import Koa from 'koa';

const app = new Koa();

app.listen(5000, () => {
  console.log('Server running on port 5000');
});
