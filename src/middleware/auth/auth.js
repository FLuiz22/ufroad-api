import { ErrorNotFound, ErrorUnauthorized } from "@util/errors.js";
import jwt from "jsonwebtoken";
import User from "@User/User.js";

const authorize = async (req, res, next, type) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        throw new ErrorUnauthorized("Requisição sem token.");
    }

    const parts = authHeader.split(" ");

    const [scheme, token] = parts.length === 2 ? parts : [null, null];

    if (scheme === null || !/^Bearer$/i.test(scheme))
        throw new ErrorUnauthorized("Token mal formatado.");

    let decoded;
    try {
        // wrap into a promise, as jwt uses callbacks and those aren't catched by our error handler..
        decoded = await new Promise((resolve, reject) => {
            jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(decoded);
                }
            });
        });
    } catch (err) {
        throw new ErrorUnauthorized("Token inválido.");
    }

    const user = await User.findOne({ _id: decoded.sub });
    // const course = await Course.findOne({ _id: decoded.sub }); [feat futura..]

    const isAdmin = (user) => user && user.isAdmin;

    switch (type) {
        case "userExist":
            if (!user) {
                throw new ErrorNotFound("Usuário não existe");
            }
            break;

        case "itself":
            if (!isAdmin(user) && user._id.toString() !== req.params.id) {
                throw new ErrorUnauthorized("Usuário não autorizado");
            }
            break;

        case "administrator":
            if (!isAdmin(user)) {
                // se o usuario nao eh adm e tenta acessar algo de adm
                throw new ErrorUnauthorized("Usuário não autorizado");
            }
            break;

        /* feat futura...
        case "authorized":
            if(res.user.course !== course){ // se o curso do usuario é diferente do curso em questao
                throw new ErrorUnauthorized("Usuário não autorizado"); //  nao é do curso em questao e nao pode fazer determinadas coisas
            }; break
        */
    }
    next();
};

export default {
    async userExist(req, res, next) {
        return await authorize(req, res, next, "userExist");
    },

    async isAdmin(req, res, next) {
        return await authorize(req, res, next, "administrator");
    },

    async isItself(req, res, next) {
        return await authorize(req, res, next, "itself");
    },

    /* feat futura...
    async userAuthorized(req, res, next){
        return await authorize(req, res, next, "authorized");
    },
*/
};
