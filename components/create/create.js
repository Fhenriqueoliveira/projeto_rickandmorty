const express = require("express");
const router = express.Router();
const mongodb = require("mongodb");
const ObjectId = mongodb.ObjectId;

(async ()=>{
  const dbUser = process.env.DB_USER;
  const dbPassword = process.env.DB_PASSWORD;
  const dbName = process.env.DB_NAME;
  const dbChar = process.env.DB_CHAR;

  const connectionString = `mongodb+srv://${dbUser}:${dbPassword}@cluster0.${dbChar}.mongodb.net/${dbName}?retryWrites=true&w=majority`;

  const options = {
      useUnifiedTopology: true,
  };

  const client = await mongodb.MongoClient.connect(connectionString, options);
  const db = client.db("db_rickandmorty");
  const personagens = db.collection("personagens");

  const getPersonagemById = async (id) =>
  personagens.findOne({ _id: ObjectId(id) });

  router.use(function (req, res, next) {
    next(); 
});


router.post("/", async (req, res) => {
    const objeto = req.body;

    if (!objeto || !objeto.nome || !objeto.imagemUrl) {
      res.status(400).send(
        {error:"Personagem inválido, certifique-se que tenha os campos nome e imagemUrl"}
      );
      return;
    }

    const result = await personagens.insertOne(objeto);

   //console.log(result);
    //Se ocorrer algum erro com o mongoDb esse if vai detectar
    if (result.acknowledged == false) {
      res.status(500).send("Ocorreu um erro");
      return;
    }

    res.status(201).send(objeto);
  });

});
module.exports = router;