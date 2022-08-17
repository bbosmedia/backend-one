import ApiError from '../exceptions/ApiError.js'
import TokenService from '../services/TokenService.js'

const CheckAuth = async (req, res, next) => {
	try {
		const user = await TokenService.verifyToken(req.headers.authorization)
		if (!user) {
			throw ApiError.UnauthorizedError()
		}
		req.userId = user.id
		next()
	} catch (e) {
		next(e)
	}
}

export default CheckAuth
