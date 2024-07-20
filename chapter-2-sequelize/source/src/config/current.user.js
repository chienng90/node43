import connect from "../model/connect.js";
import initModels from "../model/init-models.js";

const models = initModels(connect);

const currentUser = async (req) => {
    try {
        const email = req.user.userId; 

        const user = await models.user.findOne({ where: { email } });

        if (!user) {
            console.error(`User not found with Email: ${email}`);
            throw new Error('User not found');
        }

        return user;
    } catch (error) {
        console.error(`Error fetching user: ${error.message}`);
        throw error; // Re-throw the error to be handled by the calling function
    }
}

export default currentUser;
