import { Verifier } from '@feathersjs/authentication-local';
import ethUtil from 'ethereumjs-util';

class MetamaskVerifier extends Verifier {
  async verify(req, username, password, done) {
    const { id } = this.service;

    // username equals publicAddress
    // password equals the signature

    if (id === null || id === undefined) {
      return done(new Error('the `id` property must be set on the entity service for authentication'));
    }

    if (!username || !password) {
      return done(new Error('Request should have signature and publicAddress'));
    }

    const res = await this.app.service('api/users').find({ query: { publicAddress: username } });

    if (res.length <= 0) {
      throw new Error('User does not exist');
    }

    const user = res[0];
    const msg = `I am signing my one-time nonce: ${user.nonce}`;
    const msgBuffer = ethUtil.toBuffer(msg);
    const msgHash = ethUtil.hashPersonalMessage(msgBuffer);
    const signatureBuffer = ethUtil.toBuffer(password);
    const signatureParams = ethUtil.fromRpcSig(signatureBuffer);
    const publicKey = ethUtil.ecrecover(
      msgHash,
      signatureParams.v,
      signatureParams.r,
      signatureParams.s,
    );
    const addressBuffer = ethUtil.publicToAddress(publicKey);
    const address = ethUtil.bufferToHex(addressBuffer);

    // The signature verification is successful if the address found with
    // ecrecover matches the initial publicAddress
    if (address.toLowerCase() === username.toLowerCase()) {
      const nonce = Math.floor(Math.random() * 10000);
      try {
        await this.app.service('api/users').patch(user._id, { nonce });
        const payload = { userId: user._id, publicAddress: user.publicAddress };
        // this.params.authenticated = true;
        console.log('Success login');
        return done(null, user, payload);
      } catch (e) {
        console.log(e);
        return done(new Error('Error in changing user nonce'));
      }
    } else {
      return done(new Error('Address is not equal to username vise versa'));
    }
  }
}

module.exports = MetamaskVerifier;
