import bcrypt from "bcrypt";

const saltRounds = 12
const password = "EnterYourPassHere"

// hashing password

export const hashPassword = (password) => {
    return new Promise((resolve, reject) => {
        bcrypt.genSalt(12, (err, salt) => {
            if (err) {
                reject(err)
            }
            bcrypt.hash(password, salt, (err, hash) => {
                if (err) {
                    reject(err);
                }
                resolve(hash);
            })
        })
    })
}



// Comparing Password
export const comaparePassword = (password, hashed) => {
    return bcrypt.compare(password, hashed);
}