const express = require("express");
const router = express.Router();

//Middleware - vai especificar que é esse router que vai utilizar
router.use(function timelog(req,res, next){
    next();

})

router.get("/", async (req, res) => {	
	res.send({ info: "Olá, Blue"});
});

module.exports = router