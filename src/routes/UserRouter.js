import { Router } from 'express'
import UserController from '../controllers/UserController.js'
import CheckAuth from '../middleware/CheckAuth.js'
import { LoginValidation, RegisterValidation } from '../validations/UserValidation.js'

const UserRouter = new Router()

// Registration
UserRouter.post('/registeration', RegisterValidation, UserController.registration)

// Login
UserRouter.post('/login', LoginValidation, UserController.login)

// Logout
UserRouter.post('/logout', UserController.logout)

// Activate User
UserRouter.get('/activate/:link', UserController.activateUser)

// Refresh Token
UserRouter.get('/refresh', UserController.refreshToken)

// Get Users
UserRouter.get('/', CheckAuth, UserController.getUsers)

export default UserRouter
