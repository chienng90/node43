import express from "express";
import { likeRestaurant, rateRestaurant, retrieveRestaurantDetails, retrieveRestaurants, unlikeRestaurant } from "../controller/restaurant.controller.js";

const restaurantRouter = express.Router();

restaurantRouter.get("/restaurants", retrieveRestaurants)
restaurantRouter.get("/restaurants/:resId", retrieveRestaurantDetails)
restaurantRouter.post("/restaurants/:resId/rate", rateRestaurant)
restaurantRouter.post("/restaurants/:resId/like", likeRestaurant)
restaurantRouter.post("/restaurants/:resId/unlike", unlikeRestaurant)

export default restaurantRouter