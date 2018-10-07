const request=require("supertest");

const expect=require("expect")
const {ObjectID}=require("mongodb")

let {app}=require("../server")
let Trade=require("../models/trade")
let { users,userTokens,trades,populateTrades}=require("./seed/server.seed")



describe("Test the Post Trades routes",()=>{



   

        beforeEach(populateTrades);


        it('should be able to delete the trade if user is the owner of the trade and is authenticated',(done)=>{

            request(app).delete("/api/trades/"+trades[0]._id)
            .set("Authorization","Bearer "+ userTokens[0].token)
            .expect(200)
            .expect(resp=>{

                expect(resp.body.message).toBe("Trade deleted successfully")
            })
            .end((err,resp)=>{

                if(err){
                    return done(err);
                }

                Trade.findById(trades[0]._id).then(trade=>{
                    expect(trade).toBeFalsy();
                    done();
                })
                .catch(err=>{
                    return done(err);
                })
            });
        })

        it('should not be able to delete the trade if user is not the owner of the trade and is authenticated',(done)=>{

            request(app).delete("/api/trades/"+trades[0]._id)
            .set("Authorization","Bearer "+ userTokens[1].token)
            .expect(400)
            .expect(resp=>{

                expect(resp.body.message).toBe("You are not authorized")
            })
            .end(done);
        })


        it('should not be able to delete the trade if user isthe owner of the trade but is not authenticated',(done)=>{

            request(app).delete("/api/trades/"+trades[0]._id)
            .set("Authorization","Bearer ")
            .expect(401)
            .expect(resp=>{

                expect(resp.body.message).toBe("You are not authenticated")
            })
            .end(done);
        })



})