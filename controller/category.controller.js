import db from "../config/db.config.js"

async function createdCategory(req, res) {
    try {
        const {name, parant_id} = req.body
        if (!name) {
            const error = new Error("body not fount")
            error.status = 402
            throw error
        }
        const [[category]] = await db.query("SELECT * FROM category WHERE name = ?", name)
        if (category) {
            const error = new Error("category already exists")
            error.status = 402
            throw error
        }
        await db.query("INSERT INTO category SET ?", {name, parant_id})
        res.json("category created")
    } catch (error) {
        res.status(error.status || 500).json({error: error.message})
    }
}

async function getCategorys(req, res) {
    try {
        const [category] = await db.query("SELECT * FROM category")
        if (!category) {
            const error = new Error('category not found')
            error.status = 402
            throw error
        }
        res.json(category)
    } catch (error) {
        res.status(error.status || 500).json({error: error.message})
    }
}

async function getCategory(req, res) {
    try {
        const id = req.params.id
        if (!Math.floor(id) === id) {
            const error = new Error('category not found')
            error.status = 402
            throw error
        }
        const [[category]] = await db.query("SELECT * FROM category WHERE id = ?", id)
        if (!category) {
            const error = new Error('category not found')
            error.status = 402
            throw error
        }
        res.json(category)
    } catch (error) {
        res.status(error.status || 500).json({error: error.message})
    }
}

async function updateCategory(req, res) {
    try {
        const id = req.params.id
        if (!Math.floor(id) === id) {
            const error = new Error('category not found')
            error.status = 402
            throw error
        }
        const [[category]] = await db.query("SELECT * FROM category WHERE id = ?", id)
        if (!category) {
            const error = new Error('category not found')
            error.status = 402
            throw error
        }
        const body = req.body
        if (!body) {
            const error = new Error("body not found")
            error.status = 402
            throw error
        }
        const updated_at = new Date()
        await db.query("UPDATE category SET ?, updated_at = ? WHERE id = ?", [body, updated_at, id])
        res.json("category updated")
    } catch (error) {
        res.status(error.status || 500).json({error: error.message})
    }
}

async function deleteCategory(req, res) {
    try {
        const id = req.params.id
        if (!Math.floor(id) === id) {
            const error = new Error('category not found')
            error.status = 402
            throw error
        }
        await db.query("DELETE FROM category WHERE id = ?", id)
        res.json("category deleted")
    } catch (error) {
        res.status(error.status || 500).json({error: error.message})
    }
}

export {createdCategory, getCategory, getCategorys, updateCategory, deleteCategory}


/////// test category

// {
//     "name": "pc",
//     "parant_id": null
// }
