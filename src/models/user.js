const mongoose = require('mongoose') 
const validator=require('validator')
const bcrypt=require('bcryptjs')
const Task=require('./task')


const jwt= require('jsonwebtoken')



const userSchema= new mongoose.Schema({ 
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        unique:true,
        required:true,
        trim:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Email is invalid') 
            }
        }
    },
    password:{ 
        type:String,
        required:true,
        trim:true,
        minlength:7,
        validate(value){
           if(value.toLowerCase().includes('password')){
               throw new Error('password must not contian password')
           } 
           

            }
        
        },
    age:{
        type:Number,
        default:0,
        validate(value){
            if(value<0){
                throw new Error('Age must be a postive number')
            }
        }
    },
     tokens:[{token:{
         type:String,
         required:true

     }

    }] ,
    avatar: { 
        type:Buffer
    }
    
    
},{
    timestamps:true
})

userSchema.virtual('tasks',{ 
        ref:'Task',
        localField: '_id',
        foreignField:'Owner'

        
})

userSchema.methods.toJSON=function (){
          const user = this 
          const userObject = user.toObject()
           
          delete userObject.password
          delete userObject.tokens
          delete userObject.avatar
          
          return userObject
}

userSchema.methods.generateAuthToken=async function (){ 

const tok= jwt.sign({_id:this._id.toString()},process.env.JWT_TOKEN,)
    this.tokens=this.tokens.concat({token:tok})
await this.save()
return tok
}



userSchema.statics.findBycredentials= async (email,password)=>{ 
         
              const user =await User.findOne({email})
              if(!user){ 
                  throw new Error('Unable to login!')
              }
              const isMatch = await bcrypt.compare(password,user.password)
              if(!isMatch){ 
                  throw new Error('unable to login')
              }
              return user
           
                

          
}


userSchema.pre('save',async function(next) {

if(this.isModified('password')){ 
    this.password =await bcrypt.hash(this.password,8)
}
   
    next()
   })
 userSchema.pre('remove',async function (next){
     await Task.deleteMany({Owner: this._id})
     next()
  })

const User=mongoose.model('User',userSchema)
module.exports= User 