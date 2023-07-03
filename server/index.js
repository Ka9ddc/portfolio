/* Aqui é onde vão ficar configurados as coisas como servidor, banco de dados, rotas usadas
 e qualquer configuração relacionada ao repositório e o projeto em si. */

import express from "express";
import dotenv from "dotenv";
import connectDatabase from "./database/db.js";
import cors from "cors";

import userRoute from "./routes/project.route.js";

dotenv.config();

const app = express();

connectDatabase();

app.use(express.json());
app.use(cors());
app.use("/project", userRoute);

const port = 8080;

app.listen(port, () =>
  console.log(`O servidor do express foi aberto na porta ${port}`)
);
