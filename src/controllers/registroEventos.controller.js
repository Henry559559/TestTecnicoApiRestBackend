import { getConnection } from "./../database/database";

const getRegistroEventos= async (req, res) => {
    try {
        const connection = await getConnection();
        const result = await connection.query("SELECT ID_Registro , ID_Usuario, ID_Evento , Fecha_Registro FROM registroseventos");
        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

const getRegistroEvento= async (req, res) => {
    try {
        const { ID_Registro  } = req.params;
        const connection = await getConnection();
        const result = await connection.query("SELECT ID_Registro , ID_Usuario, ID_Evento , Fecha_Registro FROM registroseventos WHERE ID_Registro = ?", ID_Registro );
        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};


const addRegistroEventos= async (req, res) => {
    try {
        const { ID_Usuario  , ID_Evento , Fecha_Registro} = req.body;
        if (ID_Usuario === undefined || ID_Evento === undefined || Fecha_Registro === undefined) {
            res.status(400).json({message: "Bad Request. Please fill all field."});
        }
        const registroEvento = { ID_Usuario, ID_Evento, Fecha_Registro};
        const connection = await getConnection();
        const result = await connection.query("INSERT INTO registroseventos SET ?",registroEvento); 
        res.json({message: "Resgistro Eventos added"});
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

const deleteRegistroEvento= async (req, res) => {
    try {
        const { ID_Registro  } = req.params;
        const connection = await getConnection();
        const result = await connection.query("DELETE FROM registroseventos WHERE ID_Registro = ?", ID_Registro );
        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

const updateRegistroEvento= async (req, res) => {
    try {
        const { ID_Registro  } = req.params;
        const { ID_Usuario , ID_Evento , Fecha_Registro} = req.body;
        if (ID_Registro === undefined|| ID_Usuario === undefined || ID_Evento  === undefined || Fecha_Registro === undefined) {
            res.status(400).json({message: "Bad Request. Please fill all field."});
        }
        const registroEventos = { ID_Registro, ID_Usuario, ID_Evento, Fecha_Registro};
        const connection = await getConnection();
        const result = await connection.query("UPDATE registroseventos SET ? WHERE ID_Registro = ?", [registroEventos, ID_Registro]);
        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

export const methods = {
    getRegistroEventos,
    getRegistroEvento,
    addRegistroEventos,
    deleteRegistroEvento,
    updateRegistroEvento
};