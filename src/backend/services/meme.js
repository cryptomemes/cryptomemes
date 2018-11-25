import setupService from './setupService';

function setupUserService(db) {
  const beforeHook = {
  };
  const afterHook = {
  };
  return setupService(db, '/api/memes', 'meme', beforeHook, afterHook);
}

export default setupUserService;
