const bcrypt = require('bcrypt')

const saltRounds = 10

const passwordHandler = {
    hashPassword: function(pw){
        bcrypt.hash(pw, saltRounds, function(err, hash) {
            if(err){
                return err
            }
            else{
                return hash
            }
        });
    }
}

module.exports = {passwordHandler }