import express from 'express';


//middleware
import {requireSignin} from "../middlewares/index";


const router = express.Router();

//controllers 

import { register, login, logout, currentUser, forgotPassword, resetPassword } from '../controllers/auth'


router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
router.get("/current-user", requireSignin, currentUser );
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

module.exports = router;