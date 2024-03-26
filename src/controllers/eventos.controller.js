import { getConnection } from "./../database/database";


const getEventos= async (req, res) => {
    try {
        const connection = await getConnection();
        const result = await connection.query("SELECT id_Evento, Nombre_Evento, Descripcion, Fecha_Hora, Ubicacion, Creador_Evento FROM eventos");
        console.log(result);
        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

const getEvento= async (req, res) => {
    try {
        const { id_Evento } = req.params;
        const connection = await getConnection();
        const result = await connection.query("SELECT id_Evento, Nombre_Evento, Descripcion, Fecha_Hora, Ubicacion, Creador_Evento FROM eventos WHERE id_Evento = ?", id_Evento);
        console.log(result);
        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};


const addEventos = async (req, res) => {
    try {
        const { Nombre_Evento, Descripcion, Fecha_Hora, Ubicacion, Creador_Evento} = req.body;
        if (Nombre_Evento === undefined || Descripcion === undefined || Fecha_Hora === undefined || Ubicacion === undefined || Creador_Evento === undefined) {
            res.status(400).json({message: "Bad Request. Please fill all field."});
        }
        const evento = { Nombre_Evento, Descripcion, Fecha_Hora, Ubicacion, Creador_Evento};
        const connection = await getConnection();
        const result = await connection.query("INSERT INTO eventos SET ?",evento); 
        res.json({message: "Eventos added"});
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

const deleteEvento= async (req, res) => {
    try {
        const { id_Evento } = req.params;
        const connection = await getConnection();
        const result = await connection.query("DELETE FROM eventos WHERE id_Evento = ?", id_Evento);
        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

const updateEvento= async (req, res) => {
    try {
        const { id_Evento } = req.params;
        const { Nombre_Evento, Descripcion, Fecha_Hora, Ubicacion, Creador_Evento} = req.body;
        if (id_Evento === undefined|| Nombre_Evento === undefined || Descripcion === undefined || Fecha_Hora === undefined || Ubicacion === undefined || Creador_Evento === undefined) {
            res.status(400).json({message: "Bad Request. Please fill all field."});
        }
        const evento = { id_Evento, Nombre_Evento, Descripcion, Fecha_Hora, Ubicacion, Creador_Evento};
        const connection = await getConnection();
        const result = await connection.query("UPDATE eventos SET ? WHERE id_Evento = ?", [evento, id_Evento]);
        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

export const methods = {
    getEventos,
    getEvento,
    addEventos,
    deleteEvento,
    updateEvento
};