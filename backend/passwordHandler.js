import bcrypt from 'bcryptjs'

const passwordHandler = {
    hashPassword: function(pw){
        let hash = bcrypt.hashSync(pw, 10)
        return hash
    },
    checkHash: function(pw,hash){
        let res = bcrypt.compareSync(pw, hash)
        return res
    }
}

export { passwordHandler }