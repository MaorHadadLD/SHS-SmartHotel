import cors from 'cors';
import express from 'express';
import StaffRoutes from './routes/StaffRoute.js';

const app = express();

const configureApp = () => {
    app.use(cors());
};
const addRouters = () => {
    app.use('/', StaffRoutes);
};

app.get('*', async (req, res) => {
    console.log('GET request');
    res.send('SHS server');
});
const startServer = async () => {
    configureApp();
    addRouters();
    const port = process.env.PORT || 5002;
    app.listen(port, () => {
      console.log(`Server is running at port: ${port}`);
    });
  };
  await startServer();