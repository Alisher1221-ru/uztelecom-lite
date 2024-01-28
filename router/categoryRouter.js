import {Router} from "express"
import { createdCategory, deleteCategory, getCategory, getCategorys, updateCategory } from "../controller/category.controller.js"
import authGuard from "../examination/Auth.guard.js"
import RoleGuard from "../examination/Role.guard.js"

const categoryServer = Router()

categoryServer.get('/:id', getCategory)
categoryServer.get('/', getCategorys)
categoryServer.post('/', authGuard, RoleGuard, createdCategory)
categoryServer.patch('/:id', authGuard, RoleGuard, updateCategory)
categoryServer.delete('/:id', authGuard, RoleGuard, deleteCategory)

export default categoryServer
