import express from "express";
const router = express.Router();
import {signUp, signIn} from "../controllers/sign";
import {currentUser} from "../controllers/auth"
import {requireSignin} from "../middleware/index"


router.post("/sign-up",signUp)
router.post("/sign-in", signIn)
router.get("/current-user", requireSignin, currentUser);



module.exports=router