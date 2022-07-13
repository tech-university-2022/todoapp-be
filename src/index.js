const app = require('express')();
const routers = require('./routers');

const PORT = 3000;

app.use('/', routers);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
