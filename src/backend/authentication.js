import authentication from '@feathersjs/authentication';
import jwt from '@feathersjs/authentication-jwt';
import local from '@feathersjs/authentication-local';
import MetamaskVerifier from './verifier/metamaskVerifier';

function authService(app) {
  const config = app.get('auth');

  app.configure(authentication(config));
  app.configure(local({ ...config.metamask, Verifier: MetamaskVerifier }));
  app.configure(jwt());

  app.service('authentication').hooks({
    before: {
      create: [
        authentication.hooks.authenticate(['metamask', 'jwt']),
      ],
      remove: [
        authentication.hooks.authenticate('jwt'),
      ],
    },
  });
}

export default authService;
