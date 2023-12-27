import cluster from 'cluster';
import { cpus } from 'os';
import express from 'express';
import * as config from './config/config.js'
import userRoute from './api_User_Details/route/cs_route_UserDetails.js'
import customerRoute from './api_Customer_Details/route/cs_route_CustomerDetails.js'

const totalCPUs = cpus().length;

if (cluster.isPrimary) {

  console.log(`Number of CPUs is ${totalCPUs}`);
  console.log(`Master ${process.pid} is running`);

  for (let i = 0; i < totalCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker) => {
    console.log(`Worker ${worker.process.pid} died`);
    cluster.fork(); // Restart a new worker when one dies
  });

} else {
  const app = express();
  app.use(express.json());
  userRoute(app);
  customerRoute(app);
  const port = config.default.port;
  app.get("/",(req,res)=>{
    res.send("<h2>Hi There !!! </h2>");
  })
  app.listen(port, () => {
    console.log(`Worker ${process.pid} started on port ${config.default.port}`);
  });
}
