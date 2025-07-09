const bcrypt = require("bcrypt");
const usersService = require("./users.service");

const register = async (req, res) => {
    const { email, password, name } = req.body;
    try {
        const hash = await bcrypt.hash(password, 10);
        const newUser = await usersService.addUser({
            name,
            email,
            password: hash,
        });
        return res.status(201).json({
            user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email,
            },
        });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

module.exports = {
    register,
};
