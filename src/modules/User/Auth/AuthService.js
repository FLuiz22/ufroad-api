import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../User.js';

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
            return { erro: 'Usuário ou senha incorreta!'};
        }

        const match = await bcrypt.compare(password, user.password);

        if(!match) {
            return { erro: 'Usuário ou senha incorreta!' };
        }

        delete user._doc.password;

        const token = signToken(user);

        return {
            'user': user
        };
    }
};