import ApiError from '../exceptions/ApiError.js'
import TokenService from '../services/TokenService.js'

const CheckAuth = async (req, res, next) => {
	console.log(req.headers)
	try {
		const user = await TokenService.verifyToken(req.headers.authorization)
		if (!user) {
			throw ApiError.UnauthorizedError()
		}
		next()
	} catch (e) {
		next(e)
	}
}

export default CheckAuth
