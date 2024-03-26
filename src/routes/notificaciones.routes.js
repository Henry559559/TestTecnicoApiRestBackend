import { Router } from "express";
import { methods as notificacionController } from "./../controllers/notificaciones.cotroller";

const router = Router();

router.get("/", notificacionController.getNotificaciones);
router.get("/:ID_Notificacion", notificacionController.getNotificacion);
router.post("/", notificacionController.addNotificaciones);
router.delete("/:ID_Notificacion", notificacionController.deleteNotificacion);
router.put("/:ID_Notificacion", notificacionController.updateNotificacion);
export default router;