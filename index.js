//Imports
var express = require('express');

//creer objet body parser afin de permettre aux utilisateur d'ajouter une propriété.
var bodyParser = require("body-parser");

//Instansiation serveur
var hostname = 'localhost';
var port =3000;
var app = express();

//C'est à partir de cet objet myRouter, que nous allons implémenter les méthodes. 
var myRouter = express.Router(); 

//Variable recettes afin d'appeller le fichier .json
var fs=require('fs');
var data=fs.readFileSync('API_recetteCuisine.json', 'utf8');
var recette=JSON.parse(data);
console.log(recette);


myRouter.route('/recettes')

//importation des méthodes GET POST PUT DELLETE
.get(function(req, res){
	res.json({recette,
	});
});

// Nous demandons à l'application d'utiliser notre routeur
app.use(myRouter);

//launch server
app.listen(port, hostname, function (){
	console.log("Mon serveur ne fonctionne pas sur http:// sauf si je vois ce message" + hostname + ":" + port);
});

//Déclaration de la route de l'URI racine
myRouter.route('/')

// all permet de prendre en charge toutes les méthodes
.all(function(req, res){
	res.json({message: "Bienvenue sur notre API des recettes", methode: req.method});
});

myRouter.route('/recettes/:id')

.get(function (req,res){
	res.json({
		message : "Vous souhaitez accéder aux informations de la recette n°" + req.params.id,
		id : req.query.id
	});
})

const cache = await caches.open('monCache');
cache.add(new Request('/API_recetteCuisine.json'));