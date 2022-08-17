import mongoose from "mongoose"

const {Schema, model} = mongoose
const TokenModel = new Schema({
	user: {type: Schema.Types.ObjectId, required: true, ref: 'User'},
    refreshToken: {type: String, required: true} 

})

export default model('Token', TokenModel)