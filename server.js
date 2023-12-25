import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'

import * as config from './config/config.js'

const app = express()

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.listen(config.default.port,()=> console.log('App is listening on Localhost:'+ config.default.port))