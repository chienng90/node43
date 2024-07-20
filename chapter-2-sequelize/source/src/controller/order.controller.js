import currentUser from "../config/current.user.js";
import { resp } from "../config/resp.js";
import connect from "../model/connect.js";
import initModels from "../model/init-models.js";

const models = initModels(connect);

const placeOrder = async (req, res) => {
    try {
        const user = await currentUser(req);
        const { code, food_id, amount, arr_sub_food } = req.body;

        await models.sequelize.transaction(async (trans) => {
            const order = await models.order.create({
                user_id: user.user_id,
                code,
                food_id,
                amount,
                arr_sub_id: arr_sub_food
            }, {transaction: trans})
            resp(order, "The order is created", 201, res);
        })
    } catch (error) {
        resp(null, 'failed', 500, res);
    }
}

const fetchOrderHistory = async (req, res) => {
    try {
        const user = await currentUser(req);

        const orderHistory = await models.order.findAll({
            where: {
                user_id: user.user_id
            },
            include: [{
                model: models.food,
                as: 'food',
                attributes: ['food_id', 'food_name', 'image', 'desc', 'price'],
                include: {
                    model: models.food_type,
                    as: 'type'
                }
            }],
            attributes: ['code', 'food_id', 'amount', 'arr_sub_id']
        })

        resp(orderHistory, "success", 200, res);
    } catch (error) {
        resp(null, error.message, 500, res);
    }
}

export {
    fetchOrderHistory,
    placeOrder
}