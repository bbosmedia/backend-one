import { body } from 'express-validator'
import UserModel from '../models/UserModel.js'

export const RegisterValidation = [
	body('email')
		.isEmail()
		.withMessage('It is not valid email')
		.custom(async function (value) {
			const candidate = await UserModel.findOne({ email: value })

			if (candidate) {
				return Promise.reject('E-mail already in use')
			}
		}),
	body('password').isLength({ min: 6 }).withMessage('Pussword must be at least 6 characters'),
]

export const LoginValidation = [
	body('email')
		.isEmail()
		.withMessage('It is not valid email'),
	body('password').isLength({ min: 6 }).withMessage('Pussword must be at least 6 characters'),
]
