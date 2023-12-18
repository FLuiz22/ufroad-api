import AuthService from './AuthService.js';

export default {
    async signIn(req, res) {
        const data = await AuthService.signIn(req.body);

        return res.status(200).send({ data: data });
    }
}