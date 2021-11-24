require('./lib/config')
const { migrate } = require('./lib/mysql');
migrate().then(console.log).catch(console.error);
