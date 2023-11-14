import express from 'express';


//middleware
import {requireSignin} from "../middlewares/index";


const router = express.Router();
  
//controllers 

import { makeInstructor } from '../controllers/instructor'
 

router.post("/make-instructor", requireSignin, makeInstructor);


module.exports = router;