import userService from './user';

const setupAllServices = (db) => {
  return function setup() {
    const app = this;
    app
      .configure(userService(db));
  };
};

export default setupAllServices;
