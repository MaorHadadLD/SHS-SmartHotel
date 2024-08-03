import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import staffRouter from './routes/StaffRoute.js';
import guestRouter from './routes/GuestRoute.js';
import requestRouter from './routes/RequestRoute.js';
import chatRouter from './routes/ChatRoute.js';

const app = express();

const configureApp = () => {
  app.use(cors());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
};

const addRouters = () => {
  app.use('/', staffRouter);
  app.use('/', guestRouter);
  app.use('/', requestRouter);
  app.use('/chats', chatRouter);
  app.get('/', (req, res) => {
    res.send('Welcome to the Hotel Services API!');
  });
};

const startServer = async () => {
  configureApp();
  addRouters();
  const port = process.env.PORT || 3002;
  app.listen(port, () => {
    console.log(`Express server is running at port: ${port}`);
  });
};

startServer();

export { app };
