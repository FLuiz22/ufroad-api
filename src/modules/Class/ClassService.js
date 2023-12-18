import Class from "./Class.js";
import { ErrorNotFound, ErrorAlreadyExists } from "@/util/errors.js";

export default {
    async create(data) {
        const { name, credits, requirements, category, content } = data;

        const sclass = await Class.findOne({ name });

        if (sclass) {
            throw new ErrorAlreadyExists("Disciplina já existe!");
        }

        const newClass = await Class.create({
            name: name,
            credits: credits,
            requirements: requirements,
            category: category,
            content: content,
        });

        return newClass;
    },

    async findById(classId) {
        const sclass = await Class.findById(classId);

        if (!sclass) {
            throw new ErrorNotFound("Disciplina não encontrada!");
        }

        return sclass;
    },

    async update(classId, data) {
        const sclass = await Class.findById(classId);

        if (!sclass) {
            throw new ErrorNotFound("Disciplina não encontrada");
        }

        const updateClass = await Class.findByIdAndUpdate(classId, data, {
            new: true,
        });

        return updateClass;
    },

    async delete(ClassId) {
        const sclass = await Class.findById(ClassId);

        if (!sclass) {
            throw new ErrorNotFound("Disciplina não encontrada!");
        }

        await Class.findByIdAndDelete(ClassId);
    },
};
