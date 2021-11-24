const app = require('./app');

const port = process.env.PORT || 5001;
const host = '0.0.0.0';
app.listen(port, host, () => {
  console.log(`Listening on http://${host}:${port}`);
});