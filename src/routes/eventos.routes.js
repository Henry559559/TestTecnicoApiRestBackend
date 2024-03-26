import { Router } from "express";
import { methods as eventosController } from "./../controllers/eventos.controller";

const router = Router();

router.get("/", eventosController.getEventos);
router.get("/:id_Evento", eventosController.getEvento);
router.post("/", eventosController.addEventos);
router.delete("/:id_Evento", eventosController.deleteEvento);
router.put("/:id_Evento", eventosController.updateEvento);
export default router;