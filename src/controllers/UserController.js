import UserService from '../services/UserService.js'
import { validationResult } from 'express-validator'
import ApiError from '../exceptions/ApiError.js'

class UserController {
	// Registration
	async registration(req, res, next) {
		const errors = validationResult(req)
		if (!errors.isEmpty()) {
			return next(ApiError.BadRequest('', errors.errors))
		}
		try {
			const { email, password } = req.body

			const user = await UserService.regsitration(email, password)
			res.cookie('refreshToken', user.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
			return res.json(user)
		} catch (e) {
			next(e)
		}
	}

	// Login
	async login(req, res, next) {
		const errors = validationResult(req)
		if (!errors.isEmpty()) {
			return next(ApiError.BadRequest('', errors.errors))
		}

		try {
			const { email, password } = req.body
			const userData = await UserService.login(email, password)
			res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
			res.json(userData)
		} catch (e) {
			next(e)
		}
	}

	// Logout
	async logout(req, res, next) {
		try {
			const { refreshToken } = req.cookies
			const token = await UserService.logout(refreshToken)
			res.clearCookie('refreshToken')
			res.json(token)
		} catch (e) {
			next(e)
		}
	}

	// Refresh Token
	async refreshToken(req, res, next) {
		try {
			const { refreshToken } = req.cookies
			const user = UserService.refresh(refreshToken)
			res.cookie('refreshToken', user.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
			return res.json(user)
		} catch (e) {
			next(e)
		}
	}

	// Users
	async getUsers(req, res, next) {
		try {
			const users = await UserService.getUsersData()
			res.json(users)
		} catch (e) {
			next(e)
			console.log(e)
		}
	}

	// Activate User
	async activateUser(req, res, next) {
		try {
			const user = await UserService.activation(req.params.link)
			res.json(user)
		} catch (e) {
			next(e)
		}
	}
}

export default new UserController()
