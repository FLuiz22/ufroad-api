import UserService from "./UserService.js";

export default {
    async create(req, res) {
        const user = await UserService.create(req.body);
        return res.status(200).send({ user });
    },

    async findById(req, res) {
        const user = await UserService.findById(req.params.id);
        return res.status(200).send({ user });
    },

    async update(req, res) {
        const user = await UserService.update(req.params.id, req.body);
        return res.status(200).send({ user });
    },

    async delete(req, res) {
        await UserService.delete(req.params.id);
        return res
            .status(200)
            .send({ message: "Usuário removido com sucesso" });
    },
};
