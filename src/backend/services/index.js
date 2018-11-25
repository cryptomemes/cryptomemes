import userService from './user';
import memeService from './meme';

const setupAllServices = (db) => {
  return function setup() {
    const app = this;
    app
      .configure(userService(db))
      .configure(memeService(db))
  };
};

export default setupAllServices;
