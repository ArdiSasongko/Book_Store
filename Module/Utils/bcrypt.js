const bcrypt = require("bcrypt")

const hash = async(password)=>{
    const saltRound = 12
    const salt = await bcrypt.genSalt(saltRound)
    return await bcrypt.hash(password,salt)
}

const compare = async(password, hash) =>{
    return await bcrypt.compare(password,hash)
}

module.exports = { hash, compare}