import path from 'path';
import 'babel-polyfill';
import feathers from '@feathersjs/feathers';
import { MongoClient } from 'mongodb';
import express from '@feathersjs/express';
import socketio from '@feathersjs/socketio';
import configuration from '@feathersjs/configuration';
import allServices from './services/';
import authentication from './authentication';
import upload from './upload';
import promisePoller from 'promise-poller'
import { poll } from './virality'

const app = express(feathers());

const singleUpload = upload.single('image');

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
  .configure(configuration(path.join(process.cwd())))
  .post('/upload', (req, res) => {
    singleUpload(req, res, (err) => {
      if (err) {
        return res.status(422).send({errors: [{title: 'Image Upload Error', detail: err.message}] })
      }
      else if (!req.file) {
        return res.status(400).send('Image file required')
      }
      else {
        return res.json({'url': req.file.location})
      }
    })
  });

const server = async () => {
  const db = await MongoClient.connect(app.get('mongoURI'));
  app.configure(authentication)
  app.configure(allServices(db));
  const poller = promisePoller({
    taskFn: async () => { await poll(app) },
    interval: 60000,
    shouldContinue: () => {
      return true;
    }
  })
  return app;
};

export default server;

