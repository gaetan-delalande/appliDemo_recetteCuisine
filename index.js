//Imports
var express = require("express");

//creer objet body parser afin de permettre aux utilisateur d'ajouter une propriété.
var bodyParser = require("body-parser");

//Instansiation serveur
var hostname = "localhost";
var port = 3000;
var app = express();

//C'est à partir de cet objet myRouter, que nous allons implémenter les méthodes.
var myRouter = express.Router();

//Variable recettes afin d'appeller le fichier .json
var fs = require("fs");
var data = fs.readFileSync("API_recetteCuisine.json", "utf8");
var jsonRecettes = JSON.parse(data);

myRouter
  .route("/recettes")

  //importation des méthodes GET POST PUT DELETE
  .get(function (req, res) {
    res.set("Cache-control", "public, max-age=300");
    res.json(jsonRecettes);
  });

myRouter
  .route("/recettesSansCache")
  //importation des méthodes GET POST PUT DELETE
  .get(function (req, res) {
    res.set("Cache-control: no-cache, no-store, must-revalidate");
    res.json(jsonRecettes);
  });

//Déclaration de la route de l'URI racine
myRouter
  .route("/")

  // all permet de prendre en charge toutes les méthodes
  .all(function (req, res) {
    res.json({
      message: "Bienvenue sur notre API des recettes",
      methode: req.method,
    });
  });

myRouter
  .route("/recettes/:id")

  .get(function (req, res) {
    const maRecetteId = jsonRecettes.recettes.find((r) => {
      return r.id === req.params.id;
    });
    res.json(maRecetteId);
  });

myRouter
  .route("/recettes/titre/:titre")

  .get(function (req, res) {
    const maRecetteTitle = jsonRecettes.recettes.find((r) => {
      return r.titre === req.params.titre;
    });
    res.json(maRecetteTitle);
  });

// Nous demandons à l'application d'utiliser notre routeur
app.use(myRouter);
//Express 4. A revoir
app.use("/serviceWorker", express.static("serviceWorker"));
app.use("/html", express.static("html"));

//launch server
app.listen(port, hostname, function () {
  console.log(
    "Mon serveur fonctionne à tous les coups :  http://" + hostname + ":" + port
  );
});