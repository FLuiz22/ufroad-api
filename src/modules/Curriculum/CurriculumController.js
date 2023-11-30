import CurriculumService from './CurriculumService.js';

export default {
    async getAll(req, res) {
        const data = await CurriculumService.getAll();
        return res.status(200).send(data);
    },

    async findById(req, res) {
        const curriculum = await CurriculumService.findById(req.params.id);
        return res.status(200).send({ curriculum });
    },

    async update(req, res) {
        const curriculum = await CurriculumService.update(req.params.id, req.body);
        return res.status(200).send({ curriculum });
    },

    async delete(req, res) {
        await CurriculumService.delete(req.params.id);
        return res.status(200).send({ message: "Grade removida com sucesso" });
    }
};