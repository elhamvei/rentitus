const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = mongoose.Schema({
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    phoneNumber: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    products: [{ 
        type: mongoose.Types.ObjectId,
        ref: 'product'
    }]
})

userSchema.statics.isEmailTaken = async function(email) {
    const user = await this.findOne({email})
    return user
}

userSchema.methods.isPasswordMatch = async function(password) {
    const user = this
    return bcrypt.compare(password, user.password)
}

userSchema.pre('save', async function(next) {
   const user = this
   if(user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 10)
   }
})

const User = mongoose.model('user', userSchema)

module.exports = User