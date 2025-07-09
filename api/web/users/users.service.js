const User = require("../../../models/users");

const addUser = async (userData) => {
    try {
        const newUser = new User(userData);
        await newUser.save();
        return newUser;
    } catch (error) {
        throw new Error("Error adding user");
    }
};

const getUserByEmail = async (email) => {
    try {
        const user = await User.findOne({ email });
        return user;
    } catch (error) {
        throw new Error("Something went wrong...");
    }
};

module.exports = {
    addUser,
    getUserByEmail,
};
