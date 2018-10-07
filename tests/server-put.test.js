const request=require("supertest");

const expect=require("expect")
const {ObjectID}=require("mongodb")

let {app}=require("../server")
let Trade=require("../models/trade")
let { users,userTokens,trades,populateTrades}=require("./seed/server.seed")



describe("Test the Put Trades routes",()=>{



 

        beforeEach(populateTrades);


        it("should be able to update the trade when user is the owner of the trade and is authenticated",(done)=>{


            trades[1].quantity=1000;
            trades[1].price=5000;
            request(app).put("/api/trades/"+ trades[1]._id.toHexString())
            .set("Authorization","Bearer "+ userTokens[1].token)
            .send(trades[1])
            .expect(201)
            .expect(resp=>{
                
                expect(resp.body.message).toBe("Updated successfully")
            })
            .end((error,resp)=>{
                if(error){
                   return done(error);
                }

                Trade.findById(trades[1]._id).then(resp=>{
                    expect(resp).toBeTruthy();
                  

                    expect(resp._id).toEqual(trades[1]._id);

                    expect(resp.quantity).toBe(1000);

                    expect(resp.price).toBe(5000);
                    done();
                }).catch(err=>{
                    return done(err);
                })
            })

        })


        it("should not be able to update the trade when user is not the owner of the trade and is authenticated",(done)=>{


            trades[0].quantity=1000;
            trades[0].price=5000;
            request(app).put("/api/trades/"+ trades[0]._id.toHexString())
            .set("Authorization","Bearer "+ userTokens[1].token)
            .send(trades[0])
            .expect(400)
            .expect(resp=>{
                
                expect(resp.body.message).toBe("Unable to update")
            })
            .end(done);
          

        })



        it("should not be able to update the trade when user is  the owner of the trade but is not authenticated",(done)=>{


            trades[0].quantity=1000;
            trades[0].price=5000;
            request(app).put("/api/trades/"+ trades[0]._id.toHexString())
            .set("Authorization","Bearer ")
            .send(trades[0])
            .expect(401)
            .expect(resp=>{
                
                expect(resp.body.message).toBe("You are not authenticated")
            })
            .end(done);
          

        })





})