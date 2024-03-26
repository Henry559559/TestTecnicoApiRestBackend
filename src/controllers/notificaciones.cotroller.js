import { getConnection } from "./../database/database";

const getNotificaciones= async (req, res) => {
    try {
        const connection = await getConnection();
        const result = await connection.query("SELECT ID_Notificacion, ID_Usuario, Mensaje, Fecha_Hora_Envio FROM notificaciones");
        console.log(result);
        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

const getNotificacion= async (req, res) => {
    try {
        const { ID_Notificacion } = req.params;
        const connection = await getConnection();
        const result = await connection.query("SELECT ID_Notificacion, ID_Usuario, Mensaje, Fecha_Hora_Envi FROM notificaciones WHERE ID_Notificacion = ?", ID_Notificacion);
        console.log(result);
        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};


const addNotificaciones= async (req, res) => {
    try {
        const { ID_Usuario  , Mensaje, Fecha_Hora_Envio} = req.body;
        if (ID_Usuario === undefined || Mensaje === undefined || Fecha_Hora_Envio === undefined) {
            res.status(400).json({message: "Bad Request. Please fill all field."});
        }
        const notificacion = { ID_Usuario, Mensaje, Fecha_Hora_Envio};
        const connection = await getConnection();
        const result = await connection.query("INSERT INTO notificaciones SET ?",notificacion); 
        res.json({message: "notificaciones added"});
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

const deleteNotificacion= async (req, res) => {
    try {
        const { ID_Notificacion } = req.params;
        const connection = await getConnection();
        const result = await connection.query("DELETE FROM notificaciones WHERE ID_Notificacion = ?", ID_Notificacion);
        console.log(result);
        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

const updateNotificacion= async (req, res) => {
    try {
        const { ID_Notificacion } = req.params;
        const { ID_Usuario, Mensaje, Fecha_Hora_Envio} = req.body;
        if (ID_Notificacion === undefined|| ID_Usuario === undefined || Mensaje === undefined || Fecha_Hora_Envio === undefined) {
            res.status(400).json({message: "Bad Request. Please fill all field."});
        }
        const notificacion = { ID_Notificacion, ID_Usuario, Mensaje, Fecha_Hora_Envio};
        const connection = await getConnection();
        const result = await connection.query("UPDATE notificaciones SET ? WHERE ID_Notificacion = ?", [notificacion, ID_Notificacion]);
        console.log(result);
        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

export const methods = {
    getNotificaciones,
    getNotificacion,
    addNotificaciones,
    deleteNotificacion,
    updateNotificacion
};