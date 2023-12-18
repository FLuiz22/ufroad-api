import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../User.js';
import { ErrorUnauthorized } from '@/util/errors.js';

const signToken = user => {
    return jwt.sign({
        iss: 'UFRoad',
        sub: user,
        iat: new Date().getTime()
    }, process.env.JWT_SECRET);
}

export default {
    async signIn(data) {
        const { email, password } = data;

        const user = await User.findOne({ email: email}).populate({path: 'course', select: 'name'});

        if(!user) {
            throw new ErrorUnauthorized('Usuário ou senha incorreta!');
        }

        const match = await bcrypt.compare(password, user.password);

        if(!match) {
            throw new ErrorUnauthorized('Usuário ou senha incorreta!');
        }

        delete user._doc.password;

        const token = signToken(user);

        return { user, token };
    }
};