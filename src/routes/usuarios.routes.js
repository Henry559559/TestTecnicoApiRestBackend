import { Router } from "express";
import { methods as usuarioController } from "./../controllers/usuario.controller"


const router = Router();

router.get("/", usuarioController.getUsuarios);
router.get("/:ID_Usuario", usuarioController.getUsuario);
router.post("/", usuarioController.addUsuarios);
router.delete("/:ID_Usuario", usuarioController.deleteUsuario);
router.put("/:ID_Usuario", usuarioController.updateUsuario);
export default router;