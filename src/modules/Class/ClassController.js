import ClassService from "./ClassService.js";

export default {
    async create(req, res) {
        const sclass = await ClassService.create(req.body);
        return res.status(200).send({ sclass });
    },

    async findById(req, res) {
        const sclass = await ClassService.findById(req.params.id);
        return res.status(200).send({ sclass });
    },

    async update(req, res) {
        const sclass = await ClassService.update(req.params.id, req.body);
        return res.status(200).send({ sclass });
    },

    async delete(req, res) {
        await ClassService.delete(req.params.id);
        return res.status(200).send({ message: "Deletado com sucesso!" });
    },
};
