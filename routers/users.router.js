import express from 'express'
import * as usersController from '../controllers/users.controller.js'
import authMiddleware from '../middlewares/auth.js'
import { authorizeRole } from '../middlewares/authorizeRole.js'
import { authorizeRoleOrSelf } from '../middlewares/authorizeRoleOrSelf.js'

const router = express.Router()

router.get('/', authMiddleware, authorizeRole([1]), usersController.getUsers) // Will match GET /users
router.get('/:id', authMiddleware,authorizeRole([1]), usersController.getUserById) // Will match GET /users/:id
router.post('/', usersController.createUser) // Will match POST /users
router.put('/:id', authMiddleware,authorizeRoleOrSelf([1]), usersController.updateUser) // Will match PUT /users/:id
router.delete('/:id', authMiddleware,authorizeRoleOrSelf([1]), usersController.deleteUser) // Will match DELETE /users/:id
router.post('/login', usersController.loginUser) // Will match POST /users/login


export default router