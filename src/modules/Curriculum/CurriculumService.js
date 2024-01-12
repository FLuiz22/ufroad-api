import Curriculum from "@Curriculum/Curriculum.js";
import { ErrorNotFound } from "@util/errors.js";

export default {
    async create(data) {
        const { yearImplemented, classes, course } = data;

        if (!yearImplemented) {
            throw new Error("Ano inválido");
        }

        const cur = await Curriculum.create({
            yearImplemented: parseInt(yearImplemented),
            classes,
            course,
        });

        return cur;
    },

    async getAll() {
        let all = await Curriculum.find();
        return all;
    },

    async findById(curId) {
        let cur = await Curriculum.findById(curId);

        if (!cur) {
            throw new ErrorNotFound("Grade não encontrada");
        }

        return cur;
    },

    async update(curId, data) {
        if (!(await Curriculum.findById(curId))) {
            throw new ErrorNotFound("Grade não encontrada");
        }

        const newCur = await Curriculum.findByIdAndUpdate(curId, data, {
            new: true,
        });

        return newCur;
    },

    async delete(curId) {
        if (!(await Curriculum.findById(curId))) {
            throw new ErrorNotFound("Grade não encontrada");
        }

        await Curriculum.findByIdAndDelete(curId);
    },
};
