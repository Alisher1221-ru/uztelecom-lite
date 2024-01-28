import { Router } from "express";
import {postControler, getProducts, getProduct,updateControler, deleteControler} from "../controller/product_controler.js";
import authGuard from "../examination/Auth.guard.js";
import RoleGuard from "../examination/Role.guard.js";

const productServer = Router()

productServer.get('/:id', getProduct)
productServer.get('/', getProducts)
productServer.post('/', authGuard, RoleGuard, postControler)
productServer.patch('/:id', authGuard, RoleGuard, updateControler)
productServer.delete('/:id', authGuard, RoleGuard, deleteControler)

export default productServer
