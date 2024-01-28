import {Router} from "express"
import {login, signup, refresh, logout, meUser, getUsers, getUser, updateUser, deleteUser} from "../controller/users_controller.js"
import authGuard from "../examination/Auth.guard.js"
import RoleGuard from "../examination/Role.guard.js"

const adminServer = Router()

adminServer.get('/:id',getUser)
adminServer.get('/',authGuard, getUsers)
adminServer.get('/me',meUser)
adminServer.post('/login', login)
adminServer.post('/signup', signup)
adminServer.post('/refresh', refresh)
adminServer.post('/logout', authGuard, logout)
adminServer.patch('/:id', authGuard, updateUser)
adminServer.delete('/:id', authGuard, deleteUser)

export default adminServer
