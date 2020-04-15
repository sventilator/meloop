var express = require("express");
var app = express();
var bodyParser = require("body-parser");
const morgan = require('morgan');
const mongoose = require('mongoose');
require('dotenv').config()

morgan('tiny')
//connection für Mongo DB
const api_key = process.env.API_KEY;

mongoose.connect(api_key,
	{
		useNewUrlParser: true,
		useUnifiedTopology: true
	})
	.then(() => { console.log('ist verbunden'); })



//folder einbinden
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set('views', __dirname + '/views');

//datenbank schema erstellen
const Schema = mongoose.Schema;
const ProductsSchema = new Schema({
	name: String,
	url: String,
	description: String,
	price: Number,
	company: String,
	id: String,
	category: String
});

//model

const Products = mongoose.model('Products', ProductsSchema);

//daten iun DB speichern

//DB.save() für Objekte

/* const objects = data.map(x => new Products(x));

try {
   // Saves objects
   const docs = objects.map(x => x.save());
} catch(e) {
  // An error happened
} */


//DB.save() für einzelne datensätze

/* products.save((error)=>{
	if(error){
		console.log("hat nicht funktioniert")
		
	}else{
		console.log("hat geklappt")
	}
}) */


//aus Datenbank in productsRender speichern

var productsRender = []

loadProductsRender()

function loadProductsRender() {
	Products.find({})
	.then((data) => {

		productsRender = data

	})
	.catch((error) => {
		console.log("error")
	})
}

//verschiedene objects für post/get
productTeaserImg=[
	{ name: "Fender Stratocaster", url: "background-image:url(//images.musicstore.de/images/1600/fender-player-stratocaster-mn-3-color-sunburst_1_GIT0045986-000.jpg)", description: "Das wohl berühmteste Modell des Fender Line Ups erhält mit der Fender Player Stratocaster.", price: 900.00, company: "Fender", id: "1", category: "guitar" },
	{ name: "Fender Telecaster", url: "background-image:url(//images.musicstore.de/images/1600/fender-alternate-reality-tenor-tele-mn-lake-placid-blue_1_GIT0048334-000.jpg)", description: "Das wohl berühmteste Modell des Fender Line Ups erhält mit der Fender Player Stratocaster.", price: 1300.00, company: "Fender", id: "2", category: "guitar" },
	{ name: "Schecter Hellraiser", url: "background-image:url(//images.musicstore.de/images/1600/schecter-c-1-fr-s-sls-elite-black-fade-burst_1_GIT0045902-000.jpg)", description: "Das wohl berühmteste Modell des Fender Line Ups erhält mit der Fender Player Stratocaster.", price: 800.00, company: "Schecter", id: "3", category: "guitar" }
]
var warenkorb = []
var searchItems = []
var warenkorbPriceSum = 0



//Home 
app.get("/", function (req, res) {



	res.render("home.ejs", { productTeaserImg: productTeaserImg })
});


//warenkorb
app.get("/warenkorb", function (req, res) {

	res.render("warenkorb", { warenkorb: warenkorb, warenkorbPriceSum: warenkorbPriceSum })
})
app.post("/warenkorb", function (req, res) {
	var obj = req.body
	var idFilter = obj[Object.keys(obj)[0]]
	productsRender.filter(function (items) {
		if (items.id === idFilter) {
			warenkorb.push(items)
			warenkorbPriceSum += items.price
		}
	});
})
//produktsuche
app.get("/searchProducts", function (req, res) {
	res.render("searchProducts", { products: searchItems })
})
app.post("/searchPost", function (req, res) {

	searchItems = [];


	productsRender.filter((item) => {

		if (req.body.itemSearch === "") {
			res.send("sie haben nichts eingegeben")
		}
		else if (item.name.toLowerCase().includes(req.body.itemSearch.toLowerCase())) {
			searchItems.push(item)

		}
	})

	res.redirect("searchProducts")

})

/* hier weitermachen */
app.delete("/warenkorb", function (req, res) {


	var obj = req.body
	var idFilter = obj[Object.keys(obj)[0]]
	productsRender.filter(function (items) {
		if (items.id === idFilter) {
			warenkorb.remove(items.id)
			res.redirect("/warenkorb")

		}
		console.log(warenkorb)

	});

	console.log(warenkorb)
})
//Get kategorie Gitarre

app.get("/gitarrenKategorie", function (req, res) {
	loadProductsRender()
	var guitarRenderedProduct = productsRender.filter((item) => {
		if (item.category === 'guitar') {
			return item
		}
	})
	res.render("gitarrenKategorie.ejs", { products: guitarRenderedProduct })

});

//Get für die aufsteigende Sortierung der Produkte
app.get("/guitarSortAsce", function (req, res) {
	loadProductsRender()
	var arr = []
	var sortedGuitars = []
	//preise erst aufsteigend sortieren und vergleichen, ob sie der KAtegorie guitar angehören
	productsRender.forEach((pe) => {
		if (pe.category == 'guitar') {
			arr.push(pe.price)
			arr.sort(function (a, b) { return a - b })
		}
	})

	//ab hier kann das sortierte arr verwendet werden
	arr.forEach((a) => {
		productsRender.forEach((p) => {
			if (p.price == a && p.category == 'guitar') {
				sortedGuitars.push(p)
			}
		})
	})
	res.render("gitarrenKategorie.ejs", { products: sortedGuitars })
});

//Get für die absteigende Sortierung der Produkte
app.get("/guitarSortDesc", function (req, res) {
	loadProductsRender()
	var arr = []
	var sortedGuitars = []
	//preise erst absteigend sortieren und vergleichen, ob sie der KAtegorie guitar angehören
	productsRender.forEach((pe) => {
		if (pe.category == 'guitar') {
			arr.push(pe.price)
			arr.sort(function (a, b) { return b - a })
		}
	})

	//ab hier kann das sortierte arr verwendet werden
	arr.forEach((a) => {
		productsRender.forEach((p) => {
			if (p.price == a && p.category == 'guitar') {
				sortedGuitars.push(p)
			}
		})
	})
	res.render("gitarrenKategorie.ejs", { products: sortedGuitars })
});




app.get("/verstaerkerKategorie", function (req, res) {
	loadProductsRender()
	var verstaerkerRenderedProduct = productsRender.filter((item) => {
		if (item.category === 'verstaerker') {
			return item
		}
	})
	res.render("verstaerkerKategorie.ejs", { products: verstaerkerRenderedProduct })

});
//Get für die aufsteigende Sortierung der Produkte
app.get("/verstaerkerSortAsce", function (req, res) {
	loadProductsRender()
	var arr = []
	var sortedVerstaerker = []
	//preise erst aufsteigend sortieren und vergleichen, ob sie der KAtegorie guitar angehören
	productsRender.forEach((pe) => {
		if (pe.category == 'verstaerker') {
			arr.push(pe.price)
			arr.sort(function (a, b) { return a - b })
		}
	})

	//ab hier kann das sortierte arr verwendet werden
	arr.forEach((a) => {
		productsRender.forEach((p) => {
			if (p.price == a && p.category == 'verstaerker') {
				sortedVerstaerker.push(p)
			}
		})
	})
	res.render("verstaerkerKategorie.ejs", { products: sortedVerstaerker })
});

//Get für die absteigende Sortierung der Produkte
app.get("/verstaerkerSortDesc", function (req, res) {
	loadProductsRender()
	var arr = []
	var sortedVerstaerker = []
	//preise erst absteigend sortieren und vergleichen, ob sie der KAtegorie guitar angehören
	productsRender.forEach((pe) => {
		if (pe.category == 'verstaerker') {
			arr.push(pe.price)
			arr.sort(function (a, b) { return b - a })
		}
	})

	//ab hier kann das sortierte arr verwendet werden
	arr.forEach((a) => {
		productsRender.forEach((p) => {
			if (p.price == a && p.category == 'verstaerker') {
				sortedVerstaerker.push(p)
			}
		})
	})
	res.render("verstaerkerKategorie.ejs", { products: sortedVerstaerker })
});


app.get("/mikrofoneKategorie", function (req, res) {
	loadProductsRender()
	var mikrofoneRenderedProduct = productsRender.filter((item) => {
		if (item.category === 'mikrofone') {
			return item
		}
	})
	res.render("mikrofoneKategorie.ejs", { products: mikrofoneRenderedProduct })

	//Get für die aufsteigende Sortierung der Produkte
	app.get("/mikrofoneSortAsce", function (req, res) {

		var arr = []
		var sortedMikrofone = []
		//preise erst aufsteigend sortieren und vergleichen, ob sie der KAtegorie mikrofone angehören
		productsRender.forEach((pe) => {
			if (pe.category == 'mikrofone') {
				arr.push(pe.price)
				arr.sort(function (a, b) { return a - b })
			}
		})

		//ab hier kann das sortierte arr verwendet werden
		arr.forEach((a) => {
			productsRender.forEach((p) => {
				if (p.price == a && p.category == 'mikrofone') {
					sortedMikrofone.push(p)
				}
			})
		})
		res.render("mikrofoneKategorie.ejs", { products: sortedMikrofone })
	});

	//Get für die absteigende Sortierung der Produkte
	app.get("/mikrofoneSortDesc", function (req, res) {
		loadProductsRender()
		var arr = []
		var sortedMikrofone = []
		//preise erst absteigend sortieren und vergleichen, ob sie der KAtegorie mikrofone angehören
		productsRender.forEach((pe) => {
			if (pe.category == 'mikrofone') {
				arr.push(pe.price)
				arr.sort(function (a, b) { return b - a })
			}
		})

		//ab hier kann das sortierte arr verwendet werden
		arr.forEach((a) => {
			productsRender.forEach((p) => {
				if (p.price == a && p.category == 'mikrofone') {
					sortedMikrofone.push(p)
				}
			})
		})
		res.render("mikrofoneKategorie.ejs", { products: sortedMikrofone })
	});

});
app.get("/drumsKategorie", function (req, res) {
	loadProductsRender()
	var drumsRenderedProduct = productsRender.filter((item) => {
		if (item.category === 'drums') {
			return item
		}
	})
	res.render("drumsKategorie.ejs", { products: drumsRenderedProduct })

});

//Get für die aufsteigende Sortierung der Produkte
app.get("/drumsSortAsce", function (req, res) {
	loadProductsRender()
	var arr = []
	var sortedDrums = []
	//preise erst aufsteigend sortieren und vergleichen, ob sie der KAtegorie drums angehören
	productsRender.forEach((pe) => {
		if (pe.category == 'drums') {
			arr.push(pe.price)
			arr.sort(function (a, b) { return a - b })
		}
	})

	//ab hier kann das sortierte arr verwendet werden
	arr.forEach((a) => {
		productsRender.forEach((p) => {
			if (p.price == a && p.category == 'drums') {
				sortedDrums.push(p)
			}
		})
	})
	res.render("drumsKategorie.ejs", { products: sortedDrums })
});

//Get für die absteigende Sortierung der Produkte
app.get("/drumsSortDesc", function (req, res) {
	loadProductsRender()
	var arr = []
	var sortedDrums = []
	//preise erst absteigend sortieren und vergleichen, ob sie der KAtegorie drums angehören
	productsRender.forEach((pe) => {
		if (pe.category == 'drums') {
			arr.push(pe.price)
			arr.sort(function (a, b) { return b - a })
		}
	})

	//ab hier kann das sortierte arr verwendet werden
	arr.forEach((a) => {
		productsRender.forEach((p) => {
			if (p.price == a && p.category == 'drums') {
				sortedDrums.push(p)
			}
		})
	})
	res.render("drumsKategorie.ejs", { products: sortedDrums })
});

app.get("/home/:thing", function (req, res) {
	var thing = req.params.thing;
	res.render("home.ejs", { thingVar: thing });

});

app.get("/produktWahl", function (req, res) {
	loadProductsRender()
	var idFromProduct = Object.values(req.query)
	var productSortedById = productsRender.find(id => id.id == idFromProduct)
	console.log(productSortedById)
	res.render("produktWahl", { productSortedById: productSortedById });
});
	app.listen(process.env.PORT || 3000, process.env.IP, function () {
		console.log("serverstart")
	})