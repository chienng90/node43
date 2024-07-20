import express from "express";
import { foodDetails, foods } from "../controller/food.controller.js";

const foodRouter = express.Router();

foodRouter.get("/foods", foods)
foodRouter.get("/foods/:foodId", foodDetails)

export default foodRouter