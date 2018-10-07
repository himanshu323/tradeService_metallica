
const Trade=require("../models/trade")

const { pushToMessageQ } = require('../Q/producer');

const _=require("lodash");

exports.createTrade=(req,resp)=>{
    console.log(req.userData);

    let tradeId=_.random(1000000,9999999);
    let trade=new Trade({
        tradeDate:req.body.tradeDate,
        commodity:req.body.commodity,
        side:req.body.side,
        quantity:req.body.quantity,
        price:req.body.price,
        counterparty:req.body.counterparty,
        location:req.body.location,
        tradeId,
        creator:req.userData.id

    })

   

    trade.save().then(data=>{
        if(process.env.NODE_ENV!=="test"){
        pushToMessageQ(JSON.stringify(data));
    }
        resp.status(201).send({message:"Trade added successfully"})
    }).catch(error=>{

       
        resp.status(500).send({
            
            message:"Trade Add Failed"
        })
    })
}

exports.fetchTrades=(req,resp)=>{

    
    tradesQuery=Trade.find();

   


    let fetchedTrades;
    tradesQuery.then(trades=>{

        //console.log(trades);
        fetchedTrades=trades;
        return trades.length;
    }).then(count=>{

        resp.status(200).send({
            message:"Trade fetched successfully",
            trades:fetchedTrades
            //,
           // maxPages:count
        })
    }).catch(error=>{

        console.log(error);
        resp.status(500).send({
            message:"Trades fetch failed"
        })
    })
}

exports.fetchTradeWithId=(req,resp)=>{



    
    Trade.findById(req.params.id).then(trade=>{
       
        if(!trade){
            
           return resp.status(404).send({
              message:"Trade not found"  
            })
        }
      

        console.log(trade);
        return resp.status(200).send(trade)
        
    }).catch(error=>{

        resp.status(500).send({
            message:"Trade fetch failed"
        })
    })
}

exports.updateTrade=(req,resp)=>{

    let trade=new Trade({
        _id:req.params.id,
        tradeDate: req.body.tradeDate,
        commodity: req.body.commodity,
        side: req.body.side,
        quantity: req.body.quantity,
        price: req.body.price,
        counterparty: req.body.counterparty,
        location: req.body.location,
        tradeId:req.body.tradeId

    })

    Trade.updateOne({_id:req.params.id,creator:req.userData.id},trade).then(trade=>{

        console.log(trade);
            if(trade.n>0){

                if(process.env.NODE_ENV!=="test"){
                    pushToMessageQ(JSON.stringify(trade));
                }
                return resp.status(201).send({
                    message:"Updated successfully"
                })
            }

            else{
                return resp.status(400).send({
                    message:"Unable to update"
                })
            }

    }).catch(error=>{

        resp.status(500).send({
            message:"Update trade failed"
        })
    })

}

exports.deleteTrade=(req,resp)=>{

    Trade.deleteOne({ _id: req.params.id ,creator:req.userData.id}).then((res) => {

        if (res.n > 0) {
            if(process.env.NODE_ENV!=="test"){
                pushToMessageQ(JSON.stringify(res));
            }
            resp.status(200).send({ message: "Trade deleted successfully" })
        }
        else {
            resp.status(400).send({
                message: "You are not authorized"
            })
        }

    }).catch(error => {
        resp.status(500).send({
            message: "Delete Trade failed"
        })
    }) 
}