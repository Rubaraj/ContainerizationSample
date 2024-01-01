
import cluster from 'cluster';
import { cpus } from 'os';
import express from 'express';
import * as config from './config/config.js'

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

  if (process.argv[2] == "user_service" || process.argv[2] == "local") {
    import('../user_service/api_User_Details/route/cs_route_UserDetails.js')
        .then(userRoute => {
          userRoute.default(app)
        })
        .catch(error => console.error("Failed to load user route", error));
  }

  if (process.argv[2] == "customer_service" || process.argv[2] == "local") {
    import('../customer_service/api_Customer_Details/route/cs_route_CustomerDetails.js')
        .then(customerRoute => {
          customerRoute.default(app)
        })
        .catch(error => console.error("Failed to load customer route", error));
  }
  const port = config.default.port;
  app.listen(port, () => {
    console.log(`Worker ${process.pid} started on port ${config.default.port}`);
  });
}
