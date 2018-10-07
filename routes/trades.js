const express = require("express")

const TradeController=require("../controllers/trades");

const authHandler=require("../middleware/auth");

const router=express.Router();

router.get("",TradeController.fetchTrades);


router.get("/:id",TradeController.fetchTradeWithId)

router.put("/:id",authHandler,TradeController.updateTrade)

router.delete("/:id",authHandler,TradeController.deleteTrade)

router.post("",authHandler,TradeController.createTrade)


module.exports=router;