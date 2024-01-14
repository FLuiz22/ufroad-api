import CourseService from "@Course/CourseService.js";

export default {
    async create(req, res) {
        const course = await CourseService.create(req.body);
        return res.status(200).send({ course });
    },

    async findById(req, res) {
        const course = await CourseService.findById(req.params.id);
        return res.status(200).send({ course });
    },

    async update(req, res) {
        const course = await CourseService.update(req.params.id, req.body);
        return res.status(200).send({ course });
    },

    async updateSClass(req, res) {
        const course = await CourseService.updateSClass(
            req.params.id,
            req.body,
        );
        return res.status(200).send({ course });
    },

    async updateCurriculum(req, res) {
        const course = await CourseService.updateCurriculum(
            req.params.id,
            req.body,
        );
        return res.status(200).send({ course });
    },

    async delete(req, res) {
        await CourseService.delete(req.params.id);
        return res.status(200).send({ message: "Curso removido com sucesso!" });
    },
};
