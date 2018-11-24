import * as path from 'path';
import * as fs from 'fs';

(() => {
  const name = process.argv[2];
  const fullPath = path.join(process.cwd(), `src/seeds/${name}.js`);
  const exists = fs.existsSync(fullPath);

  if(exists) {
    const seed = require(`./${name}`).default;
    try {
    seed();
    console.log('Seeding is sucessful.');
  }
    catch(err) {
    console.log('ERRORS: ', err);
  }  
  }
  else {
    console.log('Seed does not exist.');
}
})();
