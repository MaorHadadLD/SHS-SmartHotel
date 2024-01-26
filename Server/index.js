const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// Use body-parser middleware with a specified limit
app.use(bodyParser.json({ limit: '50mb' }));

const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`app is listening on ${port}`);
});


app.get('/*', async (req, res) => {
    res.send('SHS server');
});
