import { AppDataSource } from "./data-source";
import * as express from "express";
import * as dotenv from "dotenv";
import { Request, Response } from "express";
import { userRouter } from "./routes/user.routes";
import { tasksRouter } from "./routes/tasks.routes";
import "reflect-metadata";
import { errorHandler } from "./middleware/errorHandler";

dotenv.config();
const cors = require('cors')
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger-output.json');

const swaggerUiOptions = {
  swaggerOptions: {
    authAction: {
      bearerAuth: {
        name: "JWT",
        schema: {
          type: "http",
          in: "header",
          name: "Authorization",
        },
        value: 'segredo',
      },
    },
  },
  persistAuthorization: true,
};


const app = express();
app.use(cors({ origin: ['http://localhost:3001'], }))
app.use(express.json());
app.use(errorHandler);
const { PORT = 3000 } = process.env;
app.use(bodyParser.json());
app.use("/auth", userRouter);
app.use("/api", tasksRouter);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile, swaggerUiOptions));


app.get("*", (req: Request, res: Response) => {
  res.status(505).json({ message: "Bad Request" });
});

AppDataSource.initialize()
  .then(async () => {
    app.listen(PORT, () => {
      console.log("Server is running on http://localhost:" + PORT);
    });
    console.log("Data Source has been initialized!");
  })
  .catch((error) => console.log(error));