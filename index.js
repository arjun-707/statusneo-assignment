const express = require('express');
const routes = require('./routes');
const { sendResponse } = require('./utils');
const app = express()


app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use('/v1', routes)

app.use((req, res, next) => {
  return sendResponse(res, 404, 'endpoint not found');
});

const PORT = process.env.NODE_ENV|| 3000
app.listen(PORT, () =>  console.log(`app is listening to PORT: ${PORT}`))