const express = require('express');

const { auth } = require("express-oauth2-jwt-bearer");
// Importamos el Middleware Error Handler
const errorHandler = require('./middlewares/errorHandler');

// Configuración Middleware con el Servidor de Autorización
const autenticacion = auth({
    audience: "http://localhost:3000/api/productos",
    issuerBaseURL: "https://dev-utn-frc-iaew.auth0.com/",
    tokenSigningAlg: "RS256",
});

const app = express();

app.use(express.json());

// Importamos el Router de Libros
const librosRouter = require('./routes/libros');

// Configuramos el middleware de autenticación
app.use("/libros", autenticacion, librosRouter);

app.use(errorHandler);

app.listen(3000, () => {
    console.log('Servidor iniciado en el puerto 3000');
});