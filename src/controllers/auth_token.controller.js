import { token } from "morgan";
import getusuario from "../helpers/auth-by-email-pwd.js";
import { getConnection } from "./../database/database";
import { jwtVerify, SignJWT } from "jose";

const { TextEncoder } = require('util');

const authTokenRouter = async (req, res) => {
    const { email, password } = req.body;
    console.log(req.body);

    // Validación básica de email y contraseña
    if (!email || !password || !email.includes('@') || password.length < 3) {
        return res.status(400).json({ message: "Bad Request. Please provide a valid email and password." });
    }

    try {
        const user = await getusuario(email, password);
        if (!user) {
            throw new Error('User not found or incorrect password.');
        }

        // Generar token y devolver token
        const jwtConstructor = new SignJWT({ userID: user.ID_Usuario });
        const encoder = new TextEncoder();
        const jwt = await jwtConstructor
            .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
            .setIssuedAt()
            .setExpirationTime('1h')
            .sign(encoder.encode(process.env.JWT_PRIVATE_KEY));

        return res.json({ jwt });
    } catch (error) {
        console.error(error);
        return res.status(401).json({ message: "Unauthorized. " + error.message });
};
}
const getUserByGuid = async (userID) => {
    const connection = await getConnection();
    const [user] = await connection.query("SELECT ID_Usuario, Nombre, Correo_Electronico, Contrasena_Hash FROM usuarios WHERE ID_Usuario = ?", [userID]);
    if (!user) {
        throw new Error('Usuario no encontrado.');
    }
    // Eliminar la contraseña hash antes de devolver el objeto de usuario
    delete user.Contrasena_Hash;
    return user;
    }; 

    const extractToken = (req) => {
        const { authorization } = req.headers;
        if (!authorization) {
            console.log("No hay token de autorización");
            throw new Error("Token not provided");
        }
    
        const [bearer, token] = authorization.split(" ");
        if (bearer !== "Bearer" || !token) {
            console.log("Formato de token inválido o token ausente", bearer, token);
            throw new Error("Token format invalid");
        }
    
        return token;
    };
const getAuthTokenRouter =  async (req, res) => {
    const { authorization } = req.headers;
    if (!authorization) {
        return res.sendStatus(401); // No hay token de autorización
    }
    try {
        let token = extractToken(req); // Extrae el token usando la función auxiliar;
        token = token.replace(/^"(.*)"$/, '$1'); // Elimina las comillas dobles
        token = token.replace(/^'(.*)'$/, '$1');
       
        const encoder = new TextEncoder();
    // Verificar el token JWT
        const  {payload} = await jwtVerify(
        token, // Usa el token extraído
        encoder.encode(process.env.JWT_PRIVATE_KEY)
    );
    // Obtener el usuario por su GUID
    const user = await getUserByGuid(payload.userID); // Asegúrate de que el payload contenga userID
    if (!user) {
        return res.sendStatus(401); // Usuario no encontrado
    }
    // Enviar la información del usuario
    return res.send(user);
    } catch (err) {
        return res.sendStatus(401); // Error al verificar el token
    }
};

export const methods = {
    authTokenRouter,
    getAuthTokenRouter
};

