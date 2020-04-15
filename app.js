var express = require("express");
var app = express();
var bodyParser = require("body-parser");
const morgan = require('morgan');
const mongoose=require('mongoose');
require('dotenv').config()

morgan('tiny')
//connection für Mongo DB
const api_key=process.env.API_KEY;

mongoose.connect(api_key,
{
	useNewUrlParser:true,
	useUnifiedTopology:true
})
.then(()=>{console.log('ist verbunden');})



//folder einbinden
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set('views', __dirname + '/views');

//datenbank schema erstellen
const Schema = mongoose.Schema;
const ProductsSchema = new Schema({
	name:String,
	url:String,
	description:String,
	price:Number,
	company:String,
	id:String,
	category:String
});

//model

const Products = mongoose.model('Products', ProductsSchema);

//daten speichern

/* const data=[
	{ name: "Fender Stratocaster", url: "background-image:url(//images.musicstore.de/images/1600/fender-player-stratocaster-mn-3-color-sunburst_1_GIT0045986-000.jpg)", description: "Das wohl berühmteste Modell des Fender Line Ups erhält mit der Fender Player Stratocaster.", price: 900.00, company: "Fender", id: "1", category: "guitar" },
	{ name: "Fender Telecaster", url: "background-image:url(//images.musicstore.de/images/1600/fender-alternate-reality-tenor-tele-mn-lake-placid-blue_1_GIT0048334-000.jpg)", description: "Das wohl berühmteste Modell des Fender Line Ups erhält mit der Fender Player Stratocaster.", price: 1300.00, company: "Fender", id: "2", category: "guitar" },
	{ name: "Schecter Hellraiser", url: "background-image:url(//images.musicstore.de/images/1600/schecter-c-1-fr-s-sls-elite-black-fade-burst_1_GIT0045902-000.jpg)", description: "Das wohl berühmteste Modell des Fender Line Ups erhält mit der Fender Player Stratocaster.", price: 800.00, company: "Schecter", id: "3", category: "guitar" },
	{ name: "prs custom", url: "background-image:url(//images.musicstore.de/images/1600/prs-se-custom-24-roasted-maple-limited-grey-black_1_GIT0049339-000.jpg)", description: "Das wohl berühmteste Modell des Fender Line Ups erhält mit der Fender Player Stratocaster.", price: 3900.00, company: "Prs", id: "4", category: "guitar" },
	{ name: "Fender Squire", url: "background-image:url(//images.musicstore.de/images/1600/fender-player-stratocaster-mn-3-color-sunburst_1_GIT0045986-000.jpg)", description: "Das wohl berühmteste Modell des Fender Line Ups erhält mit der Fender Player Stratocaster.", price: 179.99, company: "Fender", id: "5", category: "guitar" },
	{ name: "prs hollowbody-se", url: "background-image:url(//images.musicstore.de/images/1600/prs-se-mark-holcomb-svn-natural-satin_1_GIT0051454-000.jpg)", description: "Das wohl berühmteste Modell des Fender Line Ups erhält mit der Fender Player Stratocaster.", price: 950.00, company: "Prs", id: "6", category: "guitar" },
    { name: "Pearl Studio mk2", url: "background-image:url(//images.musicstore.de/images/1600/pearl-roadshow-compact-rs585c-wine-red-91_1_DRU0032847-000.jpg)", description: "Das wohl berühmteste Modell des Fender Line Ups erhält mit der Fender Player Stratocaster.", price: 1100.00, company: "Pearl", id: "7", category: "drums" },
	{ name: "Gretsch Round", url: "background-image:url(//images.musicstore.de/images/1600/gretsch-catalina-maple-set-cm1-e826p-satin-deep-cherry-burst_1_DRU0038879-000.jpg)", description: "Das wohl berühmteste Modell des Fender Line Ups erhält mit der Fender Player Stratocaster.", price: 899.99, company: "Gretsch", id: "8", category: "drums" },
	{ name: "Paiste reckler", url: "background-image:url(//images.musicstore.de/images/1600/paiste-pst8-cajon-hihat-crash-set_1_DRU888.jpg)", description: "Das wohl berühmteste Modell des Fender Line Ups erhält mit der Fender Player Stratocaster.", price: 950.00, company: "Paiste", id: "9", category: "drums" },
	{ name: "DW Costum c34", url: "background-image:url(//images.musicstore.de/images/1600/dw-eco-x-project-shellset-fusion-desert-sand_1_DRU0021426-000.jpg)", description: "Das wohl berühmteste Modell des Fender Line Ups erhält mit der Fender Player Stratocaster.", price: 350.00, company: "DW", id: "10", category: "drums" },
	{ name: "Pearl Studio Professional", url: "background-image:url(//images.musicstore.de/images/1600/pearl-export-lacquer-exl725s-c-black-smoke-248_1_DRU0029699-000.jpg)", description: "Das wohl berühmteste Modell des Fender Line Ups erhält mit der Fender Player Stratocaster.", price: 2600.00, company: "Pearl", id: "11", category: "drums" },
	{ name: "Gretsch X1", url: "background-image:url(//images.musicstore.de/images/1600/gretsch-renown-maple-2016-rn2-e8246-vintage-pearl_1_DRU0034959-000.jpg)", description: "Das wohl berühmteste Modell des Fender Line Ups erhält mit der Fender Player Stratocaster.", price: 1999.99, company: "Gretsch", id: "12", category: "drums" },
	{ name: "Gretsch Professional ", url: "background-image:url(//images.musicstore.de/images/1600/gretsch-catalina-maple-set-cm1-e826p-black-stardust_1_DRU0038882-000.jpg)", description: "Das wohl berühmteste Modell des Fender Line Ups erhält mit der Fender Player Stratocaster.", price: 805.00, company: "Gretsch", id: "13", category: "drums" },
	{ name: "DW Studio", url: "background-image:url(//images.musicstore.de/images/1600/dw-design-acryl-shellset-clear_1_DRU0031536-000.jpg)", description: "Das wohl berühmteste Modell des Fender Line Ups erhält mit der Fender Player Stratocaster.", price: 1500.00, company: "DW", id: "14", category: "drums" },
    { name: "Shure sm7b", url: "background-image:url(//images.musicstore.de/images/1600/shure-sm7b_1_REC0000211-000.jpg)", description: "Das wohl berühmteste Modell des Fender Line Ups erhält mit der Fender Player Stratocaster.", price: 400.00, company: "Shure", id: "15", category: "mirkofone" },
	{ name: "Shure sm58", url: "background-image:url(//images.musicstore.de/images/1600/shure-sm58-lce_1_PAH0000163-000.jpg)", description: "Das wohl berühmteste Modell des Fender Line Ups erhält mit der Fender Player Stratocaster.", price: 99.00, company: "Shure", id: "16", category: "mikrofone" },
	{ name: "Shure sm57", url: "background-image:url(//images.musicstore.de/images/1600/shure-sm57-lce-mikrofon-dynamisch_1_PAH0000162-000.jpg)", description: "Das wohl berühmteste Modell des Fender Line Ups erhält mit der Fender Player Stratocaster.", price: 80.00, company: "Shure", id: "17", category: "mikrofone" },
	{ name: "Neumann tlm 102", url: "background-image:url(//images.musicstore.de/images/1600/neumann-tlm-102-studio-microphone-nickel_1_REC0007197-000.jpg)", description: "Das wohl berühmteste Modell des Fender Line Ups erhält mit der Fender Player Stratocaster.", price: 800.00, company: "Neumann", id: "18", category: "mikrofone" },
	{ name: "Neumann U87", url: "background-image:url(//images.musicstore.de/images/1600/neumann-u87-ai_1_REC0009533-000.jpg)", description: "Das wohl berühmteste Modell des Fender Line Ups erhält mit der Fender Player Stratocaster.", price: 3900.00, company: "Neumann", id: "19", category: "mikrofone" },
	{ name: "Neumann tlm 103", url: "background-image:url(//images.musicstore.de/images/1600/neumann-tlm-103-d-ni-digital-microphone-large-membrane_1_REC0006001-000.jpg)", description: "Das wohl berühmteste Modell des Fender Line Ups erhält mit der Fender Player Stratocaster.", price: 900.00, company: "Neumann", id: "20", category: "mikrofone" },
	{ name: "Rode NT", url: "background-image:url(//images.musicstore.de/images/1600/rode-nt5-_1_REC0003866-000.jpg)", description: "Das wohl berühmteste Modell des Fender Line Ups erhält mit der Fender Player Stratocaster.", price: 250.00, company: "Rode", id: "21", category: "mikrofone" },
	{ name: "Rode NT2", url: "background-image:url(//images.musicstore.de/images/1600/rode-nt1-kit-_1_REC0011012-000.jpg)", description: "Das wohl berühmteste Modell des Fender Line Ups erhält mit der Fender Player Stratocaster.", price: 140.00, company: "Rode", id: "22", category: "mikrofone" },
    { name: "Blackstar HR20", url: "background-image:url(https://bdbo2.thomann.de/thumb/bdb3000/pics/bdbo/11585669.jpg)", description: "Das wohl berühmteste Modell des Fender Line Ups erhält mit der Fender Player Stratocaster.", price: 1100.00, company: "Blackstar", id: "23", category: "verstaerker" },
	{ name: "Blackstar HR100", url: "background-image:url(https://bdbo1.thomann.de/thumb/bdb3000/pics/bdbo/13838206.jpg)", description: "Das wohl berühmteste Modell des Fender Line Ups erhält mit der Fender Player Stratocaster.", price: 950.00, company: "Blackstar", id: "24", category: "verstaerker" },
	{ name: "Orange Custom", url: "background-image:url(//images.musicstore.de/images/1600/orange-rocker-32_1_GIT0041328-000.jpg)", description: "Das wohl berühmteste Modell des Fender Line Ups erhält mit der Fender Player Stratocaster.", price: 1700.00, company: "Orange", id: "25", category: "verstaerker" },
	{ name: "Orange Blackline h100", url: "background-image:url(//images.musicstore.de/images/1600/orange-obc112-black_1_BAS0009909-000.jpg)", description: "Das wohl berühmteste Modell des Fender Line Ups erhält mit der Fender Player Stratocaster.", price: 2499.99, company: "Orange", id: "26", category: "verstaerker" },
	{ name: "Fender Twin Jazz", url: "background-image:url(//images.musicstore.de/images/1600/fender-tone-master-deluxe-reverb_1_GIT0050563-000.jpg)", description: "Das wohl berühmteste Modell des Fender Line Ups erhält mit der Fender Player Stratocaster.", price: 750.00, company: "Fender", id: "27", category: "verstaerker" },
	{ name: "Fender Vintage 85", url: "background-image:url(//images.musicstore.de/images/1600/fender-tone-master-deluxe-reverb_1_GIT0050563-000.jpg)", description: "Das wohl berühmteste Modell des Fender Line Ups erhält mit der Fender Player Stratocaster.", price: 1050.00, company: "Fender", id: "28", category: "verstaerker" }

] */



//vorher an Array übergeben, dann über map jeden einzelnen Eintrag in DB speichern

/* const objects = data.map(x => new Products(x));

try {
   // Saves objects
   const docs = objects.map(x => x.save());
} catch(e) {
  // An error happened
} */




//für einzelne datensätze

/* products.save((error)=>{
	if(error){
		console.log("hat nicht funktioniert")
		
	}else{
		console.log("hat geklappt")
	}
}) */

//dummy für /home, soll slider werden
var productTeaserImg = [
	{ name: "Shure sm7b", url: "background-image:url(//images.musicstore.de/images/1600/shure-sm7b_1_REC0000211-000.jpg)", description: "Das wohl berühmteste Modell des Fender Line Ups erhält mit der Fender Player Stratocaster.", price: 400.00, company: "Shure", id: "15", category: "mirkofone" },
	{ name: "Gretsch X1", url: "background-image:url(//images.musicstore.de/images/1600/gretsch-renown-maple-2016-rn2-e8246-vintage-pearl_1_DRU0034959-000.jpg)", description: "Das wohl berühmteste Modell des Fender Line Ups erhält mit der Fender Player Stratocaster.", price: 1999.99, company: "Gretsch", id: "12", category: "drums" },
	{ name: "Blackstar HR100", url: "background-image:url(https://bdbo1.thomann.de/thumb/bdb3000/pics/bdbo/13838206.jpg)", description: "Das wohl berühmteste Modell des Fender Line Ups erhält mit der Fender Player Stratocaster.", price: 950.00, company: "Blackstar", id: "24", category: "verstaerker" }

]
//aus Datenbank in productsRender speichern

var productsRender= []

loadProductsRender()

function loadProductsRender(){Products.find({ })
.then((data)=>{
	
	productsRender=data
	
})
.catch((error)=>{
	console.log("error")
})}

//verschiedene objects für post/get
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
	var idFromProduct=Object.values(req.query)
	var productSortedById=productsRender.find(id=>id.id==idFromProduct)
	console.log(productSortedById)
	

	res.render("produktWahl", {productSortedById: productSortedById});



});
app.post("/addSomething", function (req, res) {
	console.log(req.body);
	var skaters = req.body.newentry
	posts.push(skaters)
	res.redirect("/posts")

});

app.delete("/deleteSomething", function (req, res) {
	console.log(req.body);
	var skaters = req.body.newentry
	posts.remove(skaters)
	res.redirect("/posts")

});




app.listen(process.env.PORT || 3000, process.env.IP, function () {
	console.log("serverstart")
})