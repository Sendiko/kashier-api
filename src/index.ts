import express, { Application, Request, Response } from "express";
import config from './config/config.js';
import syncModels from "models/sync.js";
import router from "route/route.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

await syncModels();

const PORT: number = parseInt(config.PORT);
const IP: string = "localhost";

const app: Application = express();

app.get("/", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "../views/index.html"));
})

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);

app.listen(PORT, IP, () => {
  console.log(`Hello World ${IP}:${PORT}`);
});