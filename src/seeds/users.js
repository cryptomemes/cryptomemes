import createServer from '../backend/server';
import dotenv from 'dotenv'

dotenv.config()

const seed = async () => {
  const app = await createServer();
  const users = [
    { publicAddress: process.env.PUBLIC_ADDRESS,
      username: 'Antonov',
      password: '123',
    },
  ];
  const usersService = app.service('/api/users');
  await usersService.remove(null);
  return Promise.all(users.map(user => usersService.create(user)));
};

export default seed;
