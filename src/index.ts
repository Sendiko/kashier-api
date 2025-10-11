import express, { Application, Request, Response } from "express";
import config from './config/config.js';
import syncModels from "models/sync.js";
import router from "route/route.js";
await syncModels();

const PORT: number = parseInt(config.PORT);
const IP: string = "localhost";

const app: Application = express();

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, Kashier Client!");
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);

app.listen(PORT, IP, () => {
  console.log(`Hello World ${IP}:${PORT}`);
});