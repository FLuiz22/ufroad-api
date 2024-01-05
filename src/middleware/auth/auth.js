import errorHandler from "../errorHandler";
const jwt = require("jsonwebtoken");
const User = require("@User/User");

module.exports = {
    userExist(err, req, res, next){
        authorize(err, req, res, next, "userExist");
    },

    administratorExist(err, req, res, next){
        authorize(err, req, res, next, "adminExist");
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

        switch(type) {
            case "userExist":
                if(!user){ // se o usuario nao existe
                    return errorHandler(err, req, res, next); // "usuario nao existe"
                }; break

            case "adminExist":
                if (!isAdmin(user)){ // se o adm nao existe (ex: o user tenta logar como adm, mas esse adm obviamente nao existe)
                    return errorHandler(err, req, res, next); // "administrador nao existe"
                }; break

            case "administrator":
                if(!isAdmin(user)){ // se o usuario nao eh adm e tenta acessar algo de adm (sem ser login)
                    return errorHandler(err, req, res, next); // "usuario sem permissao"
                }; break
        }
    });
};

const isAdmin = (user) => user && ["Estudante", "Administrador"].includes(`${user.role}`);