const request=require("supertest");

const expect=require("expect")
const {ObjectID}=require("mongodb")

let {app}=require("../server")
let Trade=require("../models/trade")
let { users,userTokens,trades,populateTrades}=require("./seed/server.seed")



describe("Test the Post Trades routes",()=>{





        beforeEach(populateTrades);


        it("should be able to save the trade when user submits valid trade and is authenticated",(done)=>{


            let trade={
                _id:new ObjectID().toString(),
            
                tradeDate:new Date(new Date().getTime() + 5*24*60*60*1000),
                commodity:"AL",
                side: "Buy",
                 quantity:150,
                 price:2000,
                 tradeId:null,
            
                counterparty: "Loreum",
                location: "India",
                creator:null
            
            }
            request(app).post("/api/trades")
            .set("Authorization","Bearer "+ userTokens[0].token)
            .send(trade)
            .expect(201)
            .expect(resp=>{
                //console.log(resp);
                

                expect(resp.body.message).toBe("Trade added successfully")
            })
            .end((error,resp)=>{
                if(error){
                   return done(error);
                }

                Trade.find({tradeDate:trade.tradeDate}).then(resp=>{
                    expect(resp.length).toBe(1);
                  

                    expect(resp[0].creator).toEqual(users[0]._id);
                    done();
                }).catch(err=>{
                    return done(err);
                })
            })

        })


            it("should not be able to save the trade when user is not authenticated",(done)=>{


                let trade={
                    _id:new ObjectID().toString(),
                
                    tradeDate:new Date(new Date().getTime() + 5*24*60*60*1000),
                    commodity:"AL",
                    side: "Buy",
                     quantity:150,
                     price:2000,
                     tradeId:null,
                
                    counterparty: "Loreum",
                    location: "India",
                    creator:null
                
                }
                request(app).post("/api/trades")
                .set("Authorization","Bearer "+ "w878978jhjkd")
                .send(trade)
                .expect(401)
                .expect(resp=>{
                    //console.log(resp);
                    
    
                    expect(resp.body.message).toBe("You are not authenticated")
                })
                .end(done)


            })


            it("should not be able to save the trade when users submits invalid data ",(done)=>{


                let trade={
                   
                
                }
                request(app).post("/api/trades")
                .set("Authorization","Bearer "+ userTokens[0].token)
                .send(trade)
                .expect(500)
                .expect(resp=>{
                    //console.log(resp);
                    
    
                    expect(resp.body.message).toBe("Trade Add Failed")
                })
                .end(done)


            })
        



})