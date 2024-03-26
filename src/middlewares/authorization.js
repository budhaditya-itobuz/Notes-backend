import jwt from "jsonwebtoken"
import { StatusCodes } from "http-status-codes"



const verifyToken = (token) => {
    const key = process.env.SECRET_KEY

    try {
        const decoded = jwt.verify(token, key);
        return { success: true, data: decoded };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

export const authorization = (req, res, next) => {
    const authHeader = req.headers.authorization

    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        res.status(StatusCodes.UNAUTHORIZED).send({ message: "Authorization details not found" })
        return
    }

    const result = verifyToken(token)

    if (!result.success)
        res.status(StatusCodes.UNAUTHORIZED).send({ message: "Authorization failed" })
    else{
        req.userId = result.data.userId
        next()
    }
}