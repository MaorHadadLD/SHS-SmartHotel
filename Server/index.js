import StaffRoutes from './routes/StaffRoute';
import cors from 'cors';
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 8000;


app.use(cors());
// Use body-parser middleware with a specified limit
app.use(bodyParser.json({ limit: '50mb' }));

app.listen(port, () => {
    console.log(`app is listening on ${port}`);
});

app.get('/*', async (req, res) => {
    res.send('SHS server');
});

app.use('/', StaffRoutes);