import UserModel from '../models/UserModel.js'
import bcrypt from 'bcrypt'
import { v4 as uuidv4 } from 'uuid'
import MailService from './MailService.js'
import UserDto from '../dtos/UserDto.js'
import TokenService from './TokenService.js'
import ApiError from '../exceptions/ApiError.js'

class UserService {
	// Registration Service
	async regsitration(email, password) {
		const hashedPassword = await bcrypt.hash(password, 3)

		const activationLink = await uuidv4()

		const user = await UserModel.create({ email, password: hashedPassword, activationLink })
		await MailService.sendActivationLink(email, `${process.env.API_URI}api/users/activate/${activationLink}`)

		const userDto = new UserDto(user)
		const tokens = await TokenService.generateTokens({ ...userDto })
		await TokenService.saveToken(userDto.id, tokens.refreshToken)

		return {
			...tokens,
			user: userDto,
		}
	}

	// Login Service
	async login(email, password) {
		const candidate = await UserModel.findOne({ email })

		const verify = await bcrypt.compare(password, candidate.password)

		if (!candidate || !verify) {
			throw ApiError.BadRequest('Eamil or password is wrong')
		}

		const userDto = new UserDto(candidate)
		const tokens = await TokenService.generateTokens({ ...userDto })
		await TokenService.saveToken(userDto.id, tokens.refreshToken)

		return {
			...tokens,
			user: userDto,
		}
	}

	// Activation Service
	async activation(activationLink) {
		const user = await UserModel.findOne({ activationLink })

		if (!user) {
			throw ApiError.UnauthorizedError()
		}

		if (user.isActivated) {
			throw ApiError.BadRequest('User is already activated')
		}

		user.isActivated = true

		user.save()

		return user
	}

	// Logout Service
	async logout(refreshToken) {
		console.log(refreshToken)
		const token = await TokenService.removeToken(refreshToken)
		return token
	}

	// Refersh Token Service
	async refresh(refreshToken) {
		if (!refreshToken) {
			throw ApiError.UnauthorizedError()
		}

		const userData = await TokenService.refresh(refreshToken)
		tokenFromDB = await TokenService.findToken(refreshToken)

		if (!userData || !tokenFromDB) {
			throw ApiError.UnauthorizedError()
		}

		const candidate = await UserModel.findById(userData.id)

		const userDto = new UserDto(candidate)
		const tokens = await TokenService.generateTokens({ ...userDto })
		await TokenService.saveToken(userDto.id, tokens.refreshToken)

		return {
			...tokens,
			user: userDto,
		}
	}

	// Get All Users Data
	async getUsersData() {
		const candidatesData = await UserModel.find()
		const usersData = candidatesData.map((user) => new UserDto(user))

		return usersData
	}
}

export default new UserService()
