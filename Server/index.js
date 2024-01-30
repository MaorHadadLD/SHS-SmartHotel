import cors from 'cors';
import express from 'express';
import StaffRoutes from './routes/StaffRoute.js';
import bodyParser from 'body-parser';
import guestRouter from './routes/GuestRoute.js';
import requestRouter from './routes/RequestRoute.js';

const app = express();

const configureApp = () => {
    app.use(cors());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
};
const addRouters = () => {
    app.use('/', StaffRoutes);
    app.use('/', guestRouter);
    app.use('/', requestRouter);
};


app.get('*', async (req, res) => {
    console.log('GET request');
    res.send('SHS server');
});
const startServer = async () => {
    configureApp();
    addRouters();
    const port = process.env.PORT || 3002;
    app.listen(port, () => {
      console.log(`Server is running at port: ${port}`);
    });
  };
  await startServer();