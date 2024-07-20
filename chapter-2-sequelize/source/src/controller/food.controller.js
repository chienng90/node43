import { resp } from "../config/resp.js";
import connect from "../model/connect.js";
import initModels from "../model/init-models.js";


const models = initModels(connect);

const foods = async (_, res) => {
    try {
        const result = await models.food.findAll();
        resp(result, "Success", 200, res);
    } catch (error) {
        resp(null, `Error fetching foods: ${error.message}`, 500, res);
    }
};

const foodDetails = async (req, res) => {
    try {
        const result = await models.food.findOne({
            where: {
                food_id: req.params.foodId
            },
            include: ["type", "sub_foods"]
        });
        resp(result, "Success", 200, res);
    } catch (error) {
        resp(null, `Error fetching food: ${error.message}`, 500, res);
    }
}

export {
    foods, 
    foodDetails
}