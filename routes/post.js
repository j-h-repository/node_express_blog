import express from "express";
const router = express.Router();
import {createPost, getFpPost, getTechPost, getHistoryPost, deletePost, getPost, editPost} from "../controllers/post"
import {requireSignin} from "../middleware/index"


router.post("/create-post",requireSignin, createPost)
router.get("/fp-post", getFpPost)
router.get("/tech-post", getTechPost)
router.get("/historyrit-post", getHistoryPost)
router.post("/delete-post", requireSignin, deletePost)
router.get("/one-post/:id", getPost)
router.put("/edit-post", requireSignin, editPost)

module.exports=router