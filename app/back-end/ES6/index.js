import express from 'express';
import cors from 'cors'
const app = express()

app.use(cors())

// const bootstrap = require('./src/index.routing.js')
import bootstrap from './src/index.routing.js'

const port = 5000;
app.listen(port, () => {
  console.log(`server is running on port ... ${port}`);
});

bootstrap(app);