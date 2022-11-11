import  express  from "express";
import { createUser } from "../controller/auth.js";

const router = express.Router()

router.post('/registeruser', createUser)


export default router;