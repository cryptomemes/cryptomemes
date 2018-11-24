import server from './server';
import getMemes from './web3/getMemes';

(async () => {
  await getMemes();
  const app = await server();
  app.listen(app.get('port'), () => {
    console.log('Server running at ', app.get('port'));
  });
})();
