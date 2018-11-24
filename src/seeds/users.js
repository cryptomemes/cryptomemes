import createServer from '../backend/server';

const seed = async () => {
  const app = await createServer();
  const users = [
    { publicAddress: '0x627306090abaB3A6e1400e9345bC60c78a8BEf57',
      username: 'Antonov',
      password: '123',
    },
  ];
  const usersService = app.service('/api/users');
  await usersService.remove(null);
  return Promise.all(users.map(user => usersService.create(user)));
};

export default seed;
