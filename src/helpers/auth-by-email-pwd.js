import { getConnection } from "./../database/database";

const bcrypt = require('bcrypt');

const getusuario = async (email, password) => {
    const connection = await getConnection();
    const [user] = await connection.query("SELECT ID_Usuario, Nombre, Correo_Electronico, Contrasena_Hash FROM usuarios WHERE Correo_Electronico = ?", [email]);
    
    if (!user) {
        throw new Error('Usuario no encontrado.');
    }

    const match = await bcrypt.compare(password, user.Contrasena_Hash);
    if (!match) {
        throw new Error('Contraseña incorrecta.');
    }

    // Es una buena práctica no incluir la contraseña hash en el objeto de usuario que se devuelve
    delete user.Contrasena_Hash;

    // Log para propósitos de depuración, considera removerlo para producción
    console.log('Usuario encontrado: ', JSON.stringify(user));
    
    return user;
};

export default getusuario;