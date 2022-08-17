import 'dotenv/config'

import jwt from 'jsonwebtoken'
import TokenModel from '../models/TokenModel.js'

class TokenService {
	// Generate Token
	async generateTokens(payload) {
		const accessToken = await jwt.sign(payload, process.env.JWT_ACCESS_SECRET, { expiresIn: '2d' })
		const refreshToken = await jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: '30d' })
		return { accessToken, refreshToken }
	}

	// Save Token
	async saveToken(userId, refreshToken) {
		const tokenData = await TokenModel.findOne({ user: userId })

		if (tokenData) {
			tokenData.refreshToken = refreshToken
			return tokenData.save()
		}

		const token = await TokenModel.create({ user: userId, refreshToken })

		return token
	}

	// Remove Token
	async removeToken(refreshToken) {
		const tokenData = await TokenModel.deleteOne({ refreshToken })
		return tokenData
	}

	async verifyToken(token) {
		try {
			const userData = await jwt.verify(token, process.env.JWT_ACCESS_SECRET)
			return userData
		} catch (e) {
			return null
		}
	}

	async verifyRefreshToken(refreshToken) {
		try {
			const userData = await jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET)
			return userData
		} catch (e) {
			return null
		}
	}

    async findToken(refreshToken){
        try{
            const userData = await TokenModel.findOne({refreshToken})
            return userData
        }catch(e){
            return null
        }
    }
}

export default new TokenService()
