import {Router} from "express"
import {getCarusels, getCarusel, postCarusel, updateCarusel, deleteCarusel} from '../controller/carusel.cotroller.js'
import authGuard from "../examination/Auth.guard.js"
import RoleGuard from "../examination/Role.guard.js"

const caruselServer = Router()

caruselServer.get('/:id',getCarusel)
caruselServer.get('/',authGuard, getCarusels)
caruselServer.post('/', authGuard, RoleGuard, postCarusel)
caruselServer.patch('/:id', authGuard, RoleGuard, updateCarusel)
caruselServer.delete('/:id', authGuard, RoleGuard, deleteCarusel)

export default caruselServer
