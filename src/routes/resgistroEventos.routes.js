import { Router } from "express";
import { methods as registroEventoController } from "./../controllers/registroEventos.controller";


const router = Router();

router.get("/", registroEventoController.getRegistroEventos);
router.get("/:ID_Registro", registroEventoController.getRegistroEvento);
router.post("/", registroEventoController.addRegistroEventos);
router.delete("/:ID_Registro", registroEventoController.deleteRegistroEvento);
router.put("/:ID_Registro", registroEventoController.updateRegistroEvento);
export default router;