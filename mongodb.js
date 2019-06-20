//crud create read update and delete//
const mongodb=require('mongodb')
const MongoClient=mongodb.MongoClient
const ObjectID=mongodb.ObjectID

/* const id=new ObjectID()
/* console.log(id)
console.log(id.getTimestamp()) */
 
const connectionURL='mongodb://127.0.0.1:27017'
const databaseName='task-manager'

MongoClient.connect(connectionURL,{useNewUrlParser:true},(error,client)=>{ 

if(error){
    return console.log('unable to connect to database!')
}
const db=client.db(databaseName)
/* 
db.collection('user').deleteMany({age:20}).then((result)=>{
    console.log(result)
}).catch((error)=>{
    console.log(error)
}) */
db.collection('task').deleteMany({description:'asking out a girl'}).then((result)=>{
    console.log(result)
}).catch((error)=>{
    console.log(error)
})
})