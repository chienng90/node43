import express from "express"
import bodyParser from "body-parser";
import cors from "cors";
import rootRouter from "./route/root.routes.js";


const app = express();

app.use(cors());
app.use(bodyParser.json({}));
app.use(rootRouter)

app.listen(3000);