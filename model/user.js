const mongoose=require('mongoose')

const UserSchema =new mongoose.Schema({
    user:{type:String, required:true,unique:true},
    pass:{type:String,required:true}
},
{collection:'users'}
)

const model= mongoose.model('UserModel',UserSchema)

module.exports=model