import errorHandler from "../errorHandler";
const jwt = require("jsonwebtoken");
const User = require("@User/User");
const Course = require("@Course/Course");

module.exports = {
    userExist(err, req, res, next){
        authorize(err, req, res, next, "userExist");
    },

    administratorExist(err, req, res, next){
        authorize(err, req, res, next, "adminExist");
    },

    userAuthorized(err, req, res, next){
        authorize(err, req, res, next, "authorized");
    },

    isAdmin(err, req, res, next){
        authorize(err, req, res, next, "administrator");
    },
};

const authorize = async (req, res, next, type) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).send({ error: "Requisição sem token." });
    }

    const parts = authHeader.split(" ");

    const [scheme, token] = parts.length === 2 ? parts : [null, null];

    if (scheme === null || !/^Bearer$/i.test(scheme))
        return res.status(401).send({ error: "Token mal formatado." });

    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
        if (err) return res.status(401).send({ error: "Token inválido." });
    
        const user = await User.findOne({ _id: decoded.sub });
        const course = await Course.findOne({ _id: decoded.sub });

        switch(type) {
            case "userExist":
                if(!user){ // se o usuario nao existe
                    return errorHandler(err, req, res, next); // "usuario nao existe"
                }; break

            case "authorized":
                if(res.user.course !== course){ // se o curso do usuario é diferente do curso em questao
                    return errorHandler(err, req, res, next); // "usuario nao autorizado" (ele nao é do curso em questao e nao pode fazer determinadas coisas)
                }; break;

            case "administrator":
                if(!isAdmin(user)){ // se o usuario nao eh adm e tenta acessar algo de adm
                    return errorHandler(err, req, res, next); // "usuario sem permissao"
                }; break
        }
    });
};

const isAdmin = (user) => user && user.isAdmin;