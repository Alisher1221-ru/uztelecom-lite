import pkg from 'jsonwebtoken';

async function RoleGuard(req, res, next) {
    try {
        if (req.role === 'admin') {
            next()
            return
        }
        const error = new Error("error you not admin")
        error.status = 400
        throw error
    } catch (error) {
        res.status(error.status || 500).json({error: error.message})
    }
}

export default RoleGuard
