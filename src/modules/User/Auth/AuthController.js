import AuthService from './AuthService.js';

export default {
    async signIn(req, res) {
        try {
            const data = await AuthService.signIn(req.body);

            if(data.error) {
                return res.status(401).send({ error: data.error });
            }

            return res.status(200).send({ data: data });
        } catch(error) {
            return res.status(500).send({ error: error.message });
        }
    }
}