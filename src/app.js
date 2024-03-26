import express from "express";
import morgan from "morgan";
//Routes
import eventosRoutes from "./routes/eventos.routes";
import notificacionesRoutes from "./routes/notificaciones.routes";
import registroEventosRoutes from "./routes/resgistroEventos.routes";
import usuarioRoutes from "./routes/usuarios.routes";
import authTokenRouter from "./routes/auth_token.routes";
const app=express();
const cors = require('cors');

//Settings
app.set("port", 4000);
app.use(cors());

// ...resto de tu código de servidor...

app.listen(5000, () => {
    console.log('Servidor corriendo en el puerto 5000');
  });
//Middlewares
app.use(morgan("dev"));
app.use(express.json());

//Routes
app.use("/auth-token", authTokenRouter);
app.use("/api/eventos",eventosRoutes);
app.use("/api/notificaciones",notificacionesRoutes);
app.use("/api/registroEventos",registroEventosRoutes);
app.use("/api/usuarios",usuarioRoutes);

export default app;