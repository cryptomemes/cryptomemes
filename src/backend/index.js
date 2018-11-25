import server from './server';
import getMemes from './contract/getMemes';
import promisePoller from 'promise-poller'

(async () => {
  console.log('--- Initial memes fetch on index.js for testing --- ')
  await getMemes();
  const app = await server();
  app.listen(app.get('port'), () => {
    console.log('Server running at ', app.get('port'));
  });
})();
