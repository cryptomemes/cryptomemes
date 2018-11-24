import feathers from '@feathersjs/feathers';
import socketio from '@feathersjs/socketio-client';
import io from 'socket.io-client';
import auth from '@feathersjs/authentication-client';

const url = `http://${location.host}`;
const socket = io(url);

const app = feathers();

app.configure(socketio(socket));
app.configure(auth({ storage: window.localStorage }));

window.app = app;

export default app;
