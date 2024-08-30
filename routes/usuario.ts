import { Router } from "express";
import { getUsuario, getUsuarios, postUsuario, putUsuario, eliminarUsuario } from '../controllers/usuarios';

export const router = Router();


router.get("/",getUsuarios);
router.get("/:id",getUsuario);
router.post("/",postUsuario);
router.put("/:id",putUsuario);
router.delete("/:id",eliminarUsuario);








export default router;