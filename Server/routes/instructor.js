import express from 'express';


//middleware
import {requireSignin} from "../middlewares/index";


const router = express.Router();
  
//controllers 

import { makeInstructor, getAccountStatus, currentInstructor } from '../controllers/instructor'
 

router.post("/make-instructor", requireSignin, makeInstructor);
router.post("/get-account-status", requireSignin, getAccountStatus);
router.get("/current-instructor", requireSignin, currentInstructor)


module.exports = router;