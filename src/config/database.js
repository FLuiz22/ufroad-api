import mongoose from 'mongoose';

export async function setupDatabase() {
    let BD_URL;
    if (process.env.NODE_ENV === "prod") {
        console.log('Conectando com o banco de dados de produção...');
        BD_URL = process.env.BD_PROD;
    } else if (process.env.NODE_ENV === "dev") {
        console.log('Conectando com o banco de dados de desenvolvimento...');
        BD_URL = process.env.BD_DEV;
    } 
    
    mongoose.connect(BD_URL);

    mongoose.connection.on('connected', () => {
        console.log('Conectado com o banco de dados!');
    })

    mongoose.connection.on('error', (err) => {
        console.log("Erro na conexão com o banco de dados: " + err);
    });
}