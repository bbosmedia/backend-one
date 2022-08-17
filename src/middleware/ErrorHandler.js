import ApiError from '../exceptions/ApiError.js'

const ErrorHandler = (err, req, res, next) => {
	if (err instanceof ApiError) {
		return res.status(err.status).json({ message: err.message, errors: err.errors })
	}

    return res.status(500).json({message: "Something went wrongly"})
}

export default ErrorHandler
