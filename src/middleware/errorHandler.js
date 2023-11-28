import { ErrorAlreadyExists, ErrorNotFound } from "@util/errors.js";
import mongoose from "mongoose";

export default function errorHandler(err, req, res, next) {
    if (res.headersSent) {
        return next(err);
    }

    let statusCode = 500;
    let message = err.message;
    if (err instanceof ErrorNotFound) {
        statusCode = 404;
    } else if (err instanceof ErrorAlreadyExists) {
        statusCode = 400;
    } else if (err instanceof mongoose.Error.CastError && err.kind === "ObjectId") {
        // Um erro comum quando usamos o MongoDB é o usuário passar um ID invalido,
        // por conta disso, criamos um caso especifico para isso.
        message = "ObjectID ínvalido";
    } else {
        // Se não é um dos casos anteriores, então é algum erro generico.
        // Fazemos o log para facilitar debugar o problema no futuro.
        console.error("Internal error:", err);
    }

    return res.status(statusCode).json({
        error: message,
    });
}