import AuthService from './AuthService.js';

module.exports = {
    async signIn(req, res) {
        try {
            const data = await AuthService.signIn(req.body);

            if(data.hasOwnProperty('erro')) {
                return res.status(401).send({ error: data.erro });
            }

            return res.status(200).send({ data: data });
        } catch(error) {
            return res.status(500).send({ error: error.message });
        }
    }
}