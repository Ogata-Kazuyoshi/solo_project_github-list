const { setupServer } = require('./server');

const server = setupServer();
const PORT = process.env.PORT || 9876;

server.listen(PORT, () => {
  console.log('server is runnig!');
});
