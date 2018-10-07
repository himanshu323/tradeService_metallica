const request=require("supertest");

const expect=require("expect")
const {ObjectID}=require("mongodb")

let {app}=require("../server")
let Trade=require("../models/trade")
let { users,userTokens,trades,populateTrades}=require("./seed/server.seed")



describe("Test the Get Trades routes",()=>{





        beforeEach(populateTrades);



        it("should fetch all the trades from the db",(done)=>{


            request(app).get("/api/trades")
            .expect(200)
            .expect(resp=>{

                expect(resp.body.trades.length).toBe(2);

                expect(resp.body.trades[0]._id).toBe(trades[0]._id.toHexString());

                expect(resp.body.trades[1]._id).toBe(trades[1]._id.toHexString())
                
            })
            .end(done);
        })


        it("should fetch the trade if valid Trade Id is provided",(done)=>{

            request(app).get("/api/trades/"+trades[1]._id.toHexString())
            .expect(200)
            .expect(resp=>{

                expect(resp.body._id).toBe(trades[1]._id.toHexString());
            })
            .end(done);
        })


        it("should not fetch the trade if Trade Id is not found in db",(done)=>{

            request(app).get("/api/trades/"+new ObjectID().toHexString())
            .expect(404)
            .expect(resp=>{

                expect(resp.body.message).toBe("Trade not found");
            })
            .end(done);
        })


        it("should not fetch the trade if invalid Trade Id is provided",(done)=>{

            request(app).get("/api/trades/789jhjkhk")
            .expect(500)
            .expect(resp=>{

                expect(resp.body.message).toBe("Trade fetch failed");
            })
            .end(done);
        })



})