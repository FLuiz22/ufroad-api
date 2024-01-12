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

    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
        if (err) throw new ErrorUnauthorized("Token inválido.");
    
        const user = await User.findOne({ _id: decoded.sub });
        //const course = await Course.findOne({ _id: decoded.sub }); [feat futura..]

        switch(type) {

            case "userExist":
                if(!user){
                    throw new ErrorNotFound("Usuário não existe");
                }; break

            case "itself":
                if(!isAdmin(user) && (user._id.toString() !== req.params.id)){
                    throw new ErrorUnauthorized("Usuário não autorizado");
                }; break
                
            case "administrator":
                if(!isAdmin(user)){ // se o usuario nao eh adm e tenta acessar algo de adm
                    throw new ErrorUnauthorized("Usuário não autorizado"); 
                }; break

        /* feat futura...
            case "authorized":
                if(res.user.course !== course){ // se o curso do usuario é diferente do curso em questao
                    throw new ErrorUnauthorized("Usuário não autorizado"); //  nao é do curso em questao e nao pode fazer determinadas coisas
                }; break
        */ 
        }
        next();
    });
};

const isAdmin = (user) => user && user.isAdmin;

export default {
    userExist(req, res, next){
        authorize(req, res, next, "userExist");
    },
    
    isAdmin(req, res, next){
        authorize(req, res, next, "administrator");
    },

    isItself(req, res, next){
        authorize(req, res, next, "itself");
    }

/* feat futura...
    userAuthorized(req, res, next){
        authorize(req, res, next, "authorized");
    },
*/
};