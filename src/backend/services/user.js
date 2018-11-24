import setupService from './setupService';

function setupUserService(db) {
  const beforeHook = {
    create: [(hook) => { hook.data.nonce = Math.floor(Math.random() * 10000); }],
  };
  const afterHook = {
  };
  return setupService(db, '/api/users', 'user', beforeHook, afterHook);
}

export default setupUserService;
