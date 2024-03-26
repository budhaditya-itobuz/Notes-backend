import express from "express"
import {getAllUsers,getUser,updateUser,deleteUser,loginUser,addUser,} from "../controllers/userController.js"


const userRouter = express.Router()


userRouter.get("/get-user/:id", getUser)
userRouter.get("/get-all-users",getAllUsers)
userRouter.post("/register-user", addUser)
userRouter.put('/update-user/:id', updateUser)
userRouter.delete('/delete-user/:id', deleteUser)
userRouter.post("/login-user",loginUser)




export default userRouter