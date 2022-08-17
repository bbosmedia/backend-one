
class ApiError{
    status;
    errors;
    message;

    constructor(status, message, errors = []){
        this.message = message;
        this.errors = errors;
        this.status = status
    }

    static UnauthorizedError(){
        return new ApiError(401, "User is not authorized")
    }

    static BadRequest(message, errors=[]){
        return new ApiError(400, message, errors)
    }
}

export default ApiError