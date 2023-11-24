const express = require('express')

const app = express()

app.use(express.json())

const port = process.env.PORT || 8000
app.listen(port, () => {
    console.log(`app is listen to ${port}`)
})

app.get('/login', async (req, res) => {
    console.log('login')
    res.send("your'e logged in")
})

app.get('/*', async (req, res) => {
    res.send('SHS server')
})