
class ValidationError extends Error{
    constructor(message) {
        super(message)
        this.name = 'ValidationError'
    }
}

function readUser(json) {
    let user = JSON.parse(json)

    if (!user.name) {
        throw new ValidationError('no field: name')
    }
    if (!user.age) {
        throw new ValidationError('no field: age')
    }
    return user
}


try {
    let user = readUser('{"age": 25}')
} catch (error) {
    if (error instanceof ValidationError) {
        console.error('Invalid data: ' + error.message)
    }else if (error instanceof SyntaxError) {
        console.error('JSON Syntax Error: ' + error.message)
    }else {
        throw error; // 未知的error，再次抛出
    }
}