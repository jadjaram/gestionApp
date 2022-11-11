import  express  from "express";
import { createUser } from "../controller/auth.js";

const router = express.Router()

router.post('/register-user', createUser)

router.delete('/delete-user', deleteUser)

router.put('/modify-ruser', updateUser)

router.get('/user', getUser)

router.get('/users', getUsers)


export default router;
