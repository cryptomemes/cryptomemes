import server from './server';
import getMemes from './contract/getMemes';
import updateMemePrices from './contract/updateMemePrices';

(async () => {
  console.log('--- Initial memes fetch on index.js for testing --- ')
  await getMemes();
  // await updateMemePrices([[0],[100]])
  const app = await server();
  app.listen(app.get('port'), () => {
    console.log('Server running at ', app.get('port'));
  });
})();
