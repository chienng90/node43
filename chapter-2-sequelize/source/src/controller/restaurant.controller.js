import currentUser from "../config/current.user.js";
import { resp } from "../config/resp.js";
import connect from "../model/connect.js";
import initModels from "../model/init-models.js";


const models = initModels(connect);

const retrieveRestaurants = async (_, res) => {
    try {
        const result = await models.restaurant.findAll();
        resp(result, "Success", 200, res);
    } catch (error) {
        resp(null, `Error fetching restaurants: ${error.message}`, 500, res);
    }
};

// retrieve a specific restaurant with including avg rate and like count
const retrieveRestaurantDetails = async (req, res) => {
    try {
        const results = await models.restaurant.findOne({
            attributes: [
                'res_id', 
                'res_name', 
                'image', 
                'desc',
                [models.sequelize.literal('(SELECT COUNT(*) FROM like_res WHERE like_res.res_id = restaurant.res_id)'), 'like_count'],
                [models.sequelize.literal('(SELECT ROUND(AVG(rate_res.amount), 2) FROM rate_res WHERE rate_res.res_id = restaurant.res_id)'), 'avg_rate']
            ]
        });

        resp(results, 'Success', 200, res);
    } catch (error) {
        resp(null, `Error fetching rating: ${error.message}`, 500, res);
    }
};

const rateRestaurant = async (req, res) => {
    try {
        const { amount } = req.body;
        // Fetch the user by email
        const user = await currentUser(req);

        await models.sequelize.transaction(async (trans) => {
            const rateRes = await createRestaurantRating(user.user_id, req.params.resId, amount, trans);
            resp(rateRes, "success", 201, res);
        });
    } catch (error) {
        resp(null, `Error creating rating: ${error.message}`, 500, res);
    }
}

const createRestaurantRating = (userId, resId, amount, transaction) => {
    return models.rate_res.create({
        user_id: userId,
        res_id: resId,
        amount,
        date_rate: new Date()
    }, { transaction });
};

const likeRestaurant = async (req, res) => {
    try {
        const user = await currentUser(req);

        const existingLike = await models.like_res.findOne({
            where: {
                user_id: user.user_id,
                res_id: req.params.resId
            }
        })

        if (existingLike) {
            return resp(null, `The user has already liked the restaurant`, 400, res);
        } else {
            await models.sequelize.transaction(async (trans) => {
                const likeRes = await createRestaurantLiking(user.user_id, req.params.resId, trans);
                resp(likeRes, "success", 201, res);
            });
        }
    } catch (error) {
        resp(null, `Error like a restaurant: ${error.message}`, 500, res);
    }
}

const unlikeRestaurant = async (req, res) => {
    try {
        const user = await currentUser(req);

        const existingLike = await models.like_res.destroy({
            where: {
                user_id: user.user_id,
                res_id: req.params.resId
            }
        })

        if (existingLike > 0) {
            resp(null, `Deleted ${existingLike} row(s)`, 200, res);
        } else {
            resp(null, 'No rows found to delete', 404, res);
        }
    } catch (error) {
        resp(null, `Error like a restaurant: ${error.message}`, 500, res);
    }
}

const createRestaurantLiking = (userId, resId, transaction) => {
    return models.like_res.create({
        user_id: userId,
        res_id: resId,
        date_like: new Date()
    }, { transaction });
};

export {
    retrieveRestaurants,
    retrieveRestaurantDetails,
    rateRestaurant,
    likeRestaurant,
    unlikeRestaurant
}