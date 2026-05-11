import { Router } from "express";
import { verifyAdmin, verifyToken } from "../middleware/auth.middleware.js";

const router = Router();

router.get(
    "/admin",
    verifyToken,
    verifyAdmin, 
    (req,res) => {
        return res.status(200).json({
            message:"Welcome admin",
            user:req.user
        })
    }
)

export default router;