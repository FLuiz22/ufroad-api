import Course from "@Course/Course.js";
import { ErrorNotFound } from "@util/errors.js";

export default {
    async create(data) {
        const { name, minimumPeriods } = data;

        const newCourse = await Course.create({
            name,
            minimumPeriods,
        });

        return newCourse;
    },

    async findById(courseId) {
        const course = await Course.findById(courseId).populate('class curriculum');

        if (!course) {
            throw new ErrorNotFound("Curso não encontrado");
        }

        return course;
    },

    async update(courseId, data) {
        const course = await Course.findById(courseId);

        if (!course) {
            throw new ErrorNotFound("Curso não encontrado");
        }

        const newCourse = await Course.findByIdAndUpdate(courseId, data, {
            new: true,
        });

        return newCourse;
    },

    async updateSClass(courseId, data) {
        const course = await Course.findById(courseId);

        if (!course) {
            throw new ErrorNotFound("Curso não encontrado");
        }

        if (
            course.name !== data.name ||
            course.minimumPeriods !== data.minimumPeriods ||
            course.curriculums !== data.curriculums
        ) {
            throw new ErrorNotFound("Curso não encontrado");
        }

        const newCourse = await Course.findByIdAndUpdate(courseId, data, {
            new: true,
        });

        return newCourse;
    },

    async updateCurriculum(courseId, data) {
        const course = await Course.findById(courseId);

        if (!course) {
            throw new ErrorNotFound("Curso não encontrado");
        }

        if (
            course.name !== data.name ||
            course.minimumPeriods !== data.minimumPeriods ||
            course.classes !== data.classes
        ) {
            throw new ErrorNotFound("Curso não encontrado");
        }

        const newCourse = await Course.findByIdAndUpdate(courseId, data, {
            new: true,
        });

        return newCourse;
    },

    async delete(courseId) {
        const course = await Course.findById(courseId);

        if (!course) {
            throw new ErrorNotFound("Curso não encontrado");
        }

        await Course.findByIdAndDelete(courseId);
    },
};
