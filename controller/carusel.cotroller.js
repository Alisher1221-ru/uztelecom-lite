import db from "../config/db.config.js"

async function getCarusels(req, res) {
    try {
        const [carusel] = await db.query("SELECT * FROM carusel") 
        if (!carusel){
            const error = new Error("error carusel not found")
            error.status = 403
            throw error
        }
        res.json(carusel)
    } catch (error) {
        res.status(error.status || 500).json("error in "+ error.message)
    }
}

async function getCarusel(req, res) {
    try {
        const id = req.params.id
        if (!Math.floor(id) === id) {
            const error = new Error("id is not defined")
            error.status = 403
            throw error
        }
        const [[carusel]] = await db.query("SELECT * FROM carusel WHERE id = ?", id)
        if (!carusel) {
            const error = new Error("carusel is not defined")
            error.status = 403
            throw error
        }
        res.json(carusel)
    } catch (error) {
        res.status(error.status || 500).json({error: error.message})
    }
}

async function postCarusel(req, res) {
    try {
        const {img, link} = req.body
        if (!img || !link) {
            const err = new Error("error in "+ err.message)
            err.status = 400
            throw err
        }
        await db.query("INSERT INTO carusel SET ?", {img, link})
        res.json('carusel created')
    } catch (error) {
        res.status(error.status || 500).json("error in "+ error.message)
    }
}

async function updateCarusel(req, res) {
    try {
        const body = req.body
        if (!body) {
            const err = new Error("error in "+ err.message)
            err.status = 401
            throw err
        }
        const id = req.params.id;
        const [[carusel]] = await db.query("SELECT * FROM carusel WHERE id = ?", id)
        if (!carusel) {
            const err = new Error("error in "+ err.message)
            err.status = 401
            throw err
        }
        
        const updated_at = new Date()
        await db.query("UPDATE carusel SET ?, updated_at = ? WHERE id = ?", [body, updated_at, id])
        res.json('carusel updated')
    } catch (error) {
        res.status(error.status || 500).json("error in "+ error.message)
    }
}

async function deleteCarusel(req, res) {
    try {
        const id = req.params.id
        const [[carusel]] = await db.query("SELECT * FROM carusel WHERE id = ?", id)
        if (!carusel) {
            const err = new Error("error in "+ err.message)
            err.status = 401
            throw err
        }
        await db.query("DELETE FROM carusel WHERE id = ?", id)
        res.json('carusel deleted')
    } catch (error) {
        res.status(error.status || 500).json("error in "+ error.message)
    }
}

export {
    getCarusels,
    getCarusel,
    postCarusel,
    updateCarusel,
    deleteCarusel
}


/////// test carusel

// {
//   "img": "",
//   "link": "/carusel/category"
// }
