import User from './User.js';
import { ErrorNotFound, ErrorAlreadyExists } from '../../util/Errors.js';
import { hashPassword } from '../../util/password.js';

export default {
    async create(data) {
        const { name, email, password } = data;

        const user = await User.findOne({ email });
        if (user) {
            throw new ErrorAlreadyExists('Usuário com email já existe');
        }

        const newUser = await User.create({
            name: name,
            email: email,
            password: await hashPassword(password),
        });
        
        return newUser;
    },

    async findById(userId) {
        const user = await User.findById(userId);

        if (!user) {
            throw new ErrorNotFound('Usuário não encontrado');
        }

        return user;
    },

    async update(userId, data) {
        const user = await User.findById(userId);

        if (!user) {
            throw new ErrorNotFound('Usuário não encontrado');
        }

        const newUser = await User.findByIdAndUpdate(userId, data, { new: true });

        return newUser;
    },

    async delete(userId) {
        const user = await User.findById(userId);

        if (!user) {
            throw new ErrorNotFound('Usuário não encontrado');
        }
        
        await User.findByIdAndDelete(userId);
    },
};