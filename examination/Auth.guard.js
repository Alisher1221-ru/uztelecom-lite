import pkg from 'jsonwebtoken';
const { verify } = pkg;
import env from '../config/env.config.js';

async function authGuard(req, res, next) {
    try {
        const access_token = req?.headers?.authorization?.split(" ")[1]
        if (!access_token) {
            const error = new Error('access token not found OR headers authorization not found')
            error.status = 400
            throw error
        }
        const {id, role} = verify(access_token, env.ACCESS_TOKEN)
        req.id = id
        req.role = role
        next()
    } catch (error) {
        res.status(error.status || 500).json({error: error.message})
    }
}

export default authGuard
