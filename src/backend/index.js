import server from './server';

(async () => {
  const app = await server();
  app.listen(app.get('port'), () => {
    console.log('Server running at ', app.get('port'));
  });
})();
