import db from "../config/db.config.js"
import pkg from 'jsonwebtoken';
const {sign, verify} = pkg;
import env from "../config/env.config.js"
import { compareSync, hashSync } from "bcrypt";

async function signup(req, res) {
    try {
        const {email, password, phone, user_name} = req.body
        if (!email || !password) {
            const error = new Error("error is | you didn't specify a user")
            error.status = 404
            throw error 
        }
        const heshingpasswort = hashSync(password, 2)
        const [[user]] = await db.query("SELECT * FROM users WHERE email = ? ", email)
        if (user) {
            const error = new Error("error is | the user already exists")
            error.status = 404
            throw error 
        }
        const [{insertId}] = await db.query("INSERT INTO users SET ?", {email, password: heshingpasswort, role:"user", phone, user_name})
        
        const refresh_token = sign({id: insertId, role: "user"}, env.REFRESH_TOKEN, {expiresIn: "60day"})
        const access_token = sign({id: insertId, role: "user"}, env.ACCESS_TOKEN, {expiresIn: "15m"})
        
        const hashingToken = hashSync(refresh_token, 2)
        db.query("UPDATE users SET ? WHERE id = ?", [{refresh_token: hashingToken}, insertId])
        res.json({refresh_token, access_token})
    } catch (error) {
        console.log(error);
        res.status(error.status || 500).json({ error:error.message })
    }
}

async function login(req,res) {
    try {
        const {email, password} = req.body
        if (!email || !password) {
            const error = new Error("error is | you didn't specify a user")
            error.status = 401
            throw error 
        }
        const [[user]] = await db.query("SELECT * FROM users WHERE email = ?", email)
        if (!user) {
            const error = new Error("error is | the user already exists")
            error.status = 404
            throw error 
        }
        const isPasswordMatches = compareSync(password, user.password)
        if (!isPasswordMatches) {
            const error = new Error("error is | password wrong")
            error.status = 404
            throw error 
        }
        const refresh_token = sign({id: user.id, role: user.role}, env.REFRESH_TOKEN, {expiresIn: "60day"})
        const access_token = sign({id: user.id, role: user.role}, env.ACCESS_TOKEN, {expiresIn: "15m"})

        const hashedRefresh = hashSync(refresh_token, 2)
        await db.query("UPDATE users SET refresh_token = ? WHERE id = ?", [hashedRefresh, user.id])

        res.json({refresh_token, access_token})
    } catch (error) {
        console.log(error);
        res.status(error.status || 500).json({error: error})
    }
}

async function refresh(req,res) {
    try {
        const body = req.body
        if (!body.refresh_token) {
            const error = new Error("error is | token has expired")
            error.status = 400
            throw error
        }
        const {id, role} = verify(body.refresh_token, env.REFRESH_TOKEN)
        const [[user]] = await db.query("SELECT * FROM users WHERE id = ? ", id)
        if (!user) {
            const error = new Error("error is | this is an envolite token")
            error.status = 400
            throw error
        }
        const access_token = sign({id, role}, env.ACCESS_TOKEN, {expiresIn:"15m"})
        res.json({refresh_token: body.refresh_token, access_token})
    } catch (error) {
        console.log(error);
        res.status(error.status || 500).json({error: error.message})
    }
}

async function logout(req, res) {
    try {
        const {refresh_token} = req.body
        if (!refresh_token) {
            const error = new Error("error is | your token not found")
            error.status = 401
            throw error
        }
        const {id, role} = verify(refresh_token, env.REFRESH_TOKEN)
        await db.query("UPDATE users SET refresh_token = ? WHERE id = ?",
        [null, id])
        res.json('logout')
    } catch (error) {
        res.status(error.status || 500).json({error: error.message})
    }
}

async function getUsers(req, res) {
    try {
        const [user] = await db.query("SELECT * FROM users")
        if (!user) {
            const error = new Error("no users found")
            error.status = 402
            throw error
        }
        res.json(user)
    } catch (error) {
        res.status(error.status || 500).json({error: error.message})
    }
}

async function meUser(req, res) {
    try {
        const [[user]] = await db.query("SELECT id, email, role, phone, user_name, created_at, updated_at FROM users WHERE id = ?", req.id)
        if (!user) {
            const error = new Error("no users found")
            error.status = 402
            throw error
        }
        
        res.json(user)
    } catch (error) {
        console.log(error);
        res.status(error.status || 500).json({error: error.message})
    }
}

async function getUser(req, res) {
    try {
        const id = req.params.id
        const [[user]] = await db.query("SELECT * FROM users WHERE id = ?", id)
        if (!user) {
            const error = new Error("no user found")
            error.status = 402
            throw error
        }
        res.json(user)
    } catch (error) {
        res.status(error.status || 500).json({error: error.message})
    }
}

async function updateUser(req,res) {
    try {
        const id = req.params.id
        if (!Math.floor(id) === id && !id) {
            const error = new Error("error is | you did not specify an id")
            error.status = 400
            throw error 
        }
        const [[user]] = await db.query("SELECT * FROM users WHERE id = ?", id)
        if (!user) {
            const error = new Error("error is | the user already exists")
            error.status = 404
            throw error 
        }
        const body = req.body
        if (!body) {
            const error = new Error("error is | you didn't indicate the body")
            error.status = 400
            throw error 
        }
        const heshingpasswort = hashSync(body.password, 2)
        const updated_at = new Date()
        if (req.role === 'admin') {
            await db.query("UPDATE users SET ?, password = ?, updated_at = ? WHERE id = ?", [body, heshingpasswort, updated_at, id])
    
            res.json("User ID = " + id + " has been updated")
            return  
        }
        if (req.id === id) {
            await db.query("UPDATE users SET ?, password = ?, updated_at = ? WHERE id = ?", [body, heshingpasswort, updated_at, id])
    
            res.json({access_token})
            return           
        }
        const error = new Error("error is | you are not an administrator")
        error.status = 400
        throw error 
    } catch (error) {
        console.log(error);
        res.status(error.status || 500).json({error: error.message})
    }
}

async function deleteUser(req,res) {
    try {
        const id = req.params.id
        if (!id) {
            const error = new Error("error is | you did not specify an id")
            error.status = 400
            throw error 
        }
        const [[user]] = await db.query("SELECT * FROM users WHERE id = ?", id)
        if (!user) {
            const error = new Error("error is | the user already exists")
            error.status = 404
            throw error 
        }

        if (req.id === id && req.role === 'user') {
            await db.query("DELETE FROM users WHERE id = ?", id)  
            
            res.json("User ID = " + id + " has been deleted")
            return           
        }
        if (req.role === 'admin') {
            await db.query("DELETE FROM users WHERE id = ?", id)
            
            res.json("User ID = " + id + " has been deleted")
            return  
        }

        const error = new Error("error is | you are not an administrator")
        error.status = 400
        throw error 
    } catch (error) {
        res.status(error.status || 500).json({error: error})
    }
}

export {
    login,
    signup,
    refresh,
    logout,
    meUser,
    getUsers,
    getUser,
    updateUser,
    deleteUser
}


/////////// test user

// {
//     "email": "Alisher@gmail.com",
//     "password": "246810A",
//     "phone": "888888888",
//     "user_name": "Alisher"
// }
