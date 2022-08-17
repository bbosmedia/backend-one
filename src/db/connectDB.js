import 'dotenv/config'
import mongoose from 'mongoose'

const connectDB = async () => {
	mongoose
		.connect(process.env.MONGODB_URI)
		.then(() => console.log('DB is connected successfully.'))
		.catch((e) => console.log(e))
}

export default connectDB