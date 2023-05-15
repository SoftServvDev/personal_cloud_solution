const bcrypt = require('bcrypt')
const saltRounds = 10

const passwordHandler = {
    hashPassword: (pw) => {
        bcrypt.hash(pw, saltRounds, function(err, hash) {
            if(err){
                return {"Error": err}
            }
            else{
                return hash
            }
        })
    },
    checkHash: (pw, hash) => {
        bcrypt.compare(pw, hash, function(err, result){
            if(err){
                return {"Error": err}
            }
            else{
                return result
            }
        })
    }
}

export default passwordHandler