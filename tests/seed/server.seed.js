const {ObjectID}=require("mongodb");
const Trade=require("../../models/trade")

const jwt=require("jsonwebtoken");
const bcrypt=require("bcryptjs");

let userOneId=new ObjectID();
let userTwoId=new ObjectID();

let users=[{
_id:userOneId,

email:"testA@test.com",

password:"A1234@testing"


},{
    _id:userTwoId,

    email:"testB@test.com",

password:"B1234@testing"


}]
console.log(users);
let userTokens=[{
    token:jwt.sign({email:users[0].email,id:users[0]._id},process.env.JWT_TOKEN)
},{
    token:jwt.sign({email:users[1].email,id:users[1]._id},process.env.JWT_TOKEN)
}]

let trades=[{
    _id:new ObjectID(),

    tradeDate:new Date(),
    commodity:"AL",
    side: "Buy",
     quantity:100,
     price:1500,
     tradeId:898976,

    counterparty: "Loreum",
    location: "India",
    creator:userOneId

},{
    _id:new ObjectID(),

    tradeDate:new Date(new Date().getTime()+4*24*60*60*1000),
    commodity:"Iron",
    side: "Sell",
     quantity:200,
     price:3000,
     tradeId:565643,

    counterparty: "Ipsum",
    location: "Canada",
    creator:userTwoId

}]

bcrypt.hash(users[0].password,10).then((hash)=>{


    users[0].password=hash;
})

bcrypt.hash(users[1].password,10).then((hash)=>{


    users[1].password=hash;
})

// let populateUsers=(done)=>{

//     User.remove({}).then(()=>{

        
//             let userOne= new User(users[0]).save();
//             let userTwo=new User(users[1]).save();
     
//             Promise.all([userOne,userTwo]).then(()=>{
//                done();
             
//              })
//           })

      

      
       
  
// }
   
let populateTrades=(done)=>{

    Trade.remove({}).then(()=>{

       let tradeOne= new Trade(trades[0]).save();
       let tradeTwo=new Trade(trades[1]).save();

       Promise.all([tradeOne,tradeTwo]).then(()=>{
           done();
       })
    })
}

module.exports={

    users,userTokens,trades,populateTrades
}