import { getConnection } from "./../database/database";

const bcrypt = require('bcrypt');
const fechaHoy = new Date();
const saltRounds = 10; // Puedes ajustar el número de rondas de sal
const getUsuarios= async (req, res) => {
    try {
       
        const connection = await getConnection();
        const result = await connection.query("SELECT ID_Usuario, Nombre, Correo_Electronico, Contrasena_Hash, Fecha_Creacion FROM usuarios");
        for (const iterator of result) {
            const Contrasena_Hash = await bcrypt.hash(iterator.Contrasena_Hash, saltRounds);
        }
        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

const getUsuario= async (req, res) => {
    try {
        const { ID_Usuario  } = req.params;
        const connection = await getConnection();
        const result = await connection.query("SELECT ID_Usuario, Nombre, Correo_Electronico, Contrasena_Hash, FROM usuarios WHERE ID_Usuario = ?", ID_Usuario );
        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};


const addUsuarios= async (req, res) => {
    try {
                
                    const { Nombre, Correo_Electronico, password} = req.body;
                    if (Nombre === undefined || Correo_Electronico === undefined || password === undefined) {
                        return res.status(400).json({message: "Bad Request. Please fill all fields."});
                    }

                    try {
                        // Encriptar la contraseña
                        const Fecha_Creacion = fechaHoy;
                        const Contrasena_Hash = await bcrypt.hash(password, saltRounds);
                        const usuario = { Nombre, Correo_Electronico, Contrasena_Hash, Fecha_Creacion};
                        const connection = await getConnection();
                        const result = await connection.query("INSERT INTO usuarios SET ?", usuario);
                        res.json({ message: "Registro Eventos added", result: result });
                    } catch (error) {
                        res.status(500).json({message: "Internal Server Error"});
                    }

    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

const deleteUsuario= async (req, res) => {
    try {
        const { ID_Usuario } = req.params;
        const connection = await getConnection();
        const result = await connection.query("DELETE FROM usuarios WHERE ID_Usuario = ?", ID_Usuario );
        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

const updateUsuario= async (req, res) => {
    try {
        const bcrypt = require('bcrypt');
        const saltRounds = 10; // Puedes ajustar el número de rondas de sal
        const { ID_Usuario } = req.params;
        const { Nombre, Correo_Electronico, Contrasena, fechaHoy } = req.body;
        
        if (ID_Usuario === undefined || Nombre === undefined || Correo_Electronico === undefined || Contrasena === undefined || fechaHoy === undefined) {
            return res.status(400).json({message: "Bad Request. Please fill all fields."});
        }
        
        try {
            // Encriptar la contraseña
            const Contrasena_Hash = await bcrypt.hash(Contrasena, saltRounds);
            const usuario = { Nombre, Correo_Electronico, Contrasena_Hash, fechaHoy };
            const connection = await getConnection();
            const result = await connection.query("UPDATE usuarios SET ? WHERE ID_Usuario = ?", [usuario, ID_Usuario]);
            res.json({message: "Usuario actualizado correctamente"});
        } catch (error) {
            console.error(error);
            res.status(500).json({message: "Internal Server Error"});
        }
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

const login = async (req, res)=>{
    try {
        
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

export const methods = {
    getUsuarios,
    getUsuario,
    addUsuarios,
    deleteUsuario,
    updateUsuario
};