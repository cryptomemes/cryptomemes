import path from 'path';
import 'babel-polyfill';
import feathers from '@feathersjs/feathers';
import { MongoClient } from 'mongodb';
import express from '@feathersjs/express';
import socketio from '@feathersjs/socketio';
import configuration from '@feathersjs/configuration';
import allServices from './services/';
import authentication from './authentication';

const app = express(feathers());

app
  .configure(express.rest())
  .use(express.json())
  .use(express.urlencoded({ extended: true }))
  .use(express.static(path.join(process.cwd(), 'public')))
  .configure(socketio())
  .on('connection', (connection) => {
    app.channel('anonymous').join(connection);
  })
  .publish(() => app.channel('anonymous'))
  .configure(configuration(path.join(process.cwd())));

const server = async () => {
  const db = await MongoClient.connect(app.get('mongoURI'));
  app.configure(authentication)
  app.configure(allServices(db));
  return app;
};

export default server;

