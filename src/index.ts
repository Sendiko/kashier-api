import express, { Application, Request, Response } from "express";
import config from './config/config.js';
import syncModels from "./models/sync.js";
import routerv1 from "./route/version_one.js";
import path from "path";
import { fileURLToPath } from "url";
import routerv2 from "./route/version_two.js";
import routerv3 from "./route/version_three.js";
import cors from 'cors';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

await syncModels();

const PORT: number = parseInt(config.PORT);
const IP: string = "localhost";

const app: Application = express();

app.get("/", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "../views/index.html"));
})

app.use(cors);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routerv1);
app.use(routerv2);
app.use(routerv3);

app.listen(PORT, IP, () => {
  console.log(`Hello World ${IP}:${PORT}`);
});