import User from "./User.js";
import { ErrorNotFound, ErrorAlreadyExists } from "@util/errors.js";
import { hashPassword } from "@util/password.js";

export default {
    async create(data) {
        const { name, email, password, course, isAdmin } = data;

        const user = await User.findOne({ email });
        if (user) {
            throw new ErrorAlreadyExists("Usuário com email já existente");
        }

        const newUser = await User.create({
            name: name,
            email: email,
            password: await hashPassword(password),
            course: course,
            isAdmin: isAdmin,
        });

        return newUser;
    },

    async findById(userId) {
        const user = await User.findById(userId);

        if (!user) {
            throw new ErrorNotFound("Usuário não encontrado");
        }

        return user;
    },

    async update(userId, data) {
        const user = await User.findById(userId);

        if (!user) {
            throw new ErrorNotFound("Usuário não encontrado");
        }

        delete data.isAdmin;

        const newUser = await User.findByIdAndUpdate(userId, data, {
            new: true,
        });

        return newUser;
    },

    async delete(userId) {
        const user = await User.findById(userId);

        if (!user) {
            throw new ErrorNotFound("Usuário não encontrado");
        }

        await User.findByIdAndDelete(userId);
    },
};
