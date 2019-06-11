var map;
var url;

function initMap(){
	// création et initialisation de la carte dans son conteneur div "myMap"
	var map = new google.maps.Map(document.getElementById("myMap"),{
	// puis on lui ajoute un point d'ancrage puis situer la zone qu'on veut afficher
  	center: {lat: 48.866667, lng: 2.333333},
  	// le zoom que l'on désir (de 1 "monde" à 20 "batiment")
  	zoom: 12.5
	});
	// on charge les données de l'API via l'url que je stock dans une variable
	url = 'https://opendata.paris.fr/api/records/1.0/search/?dataset=liste_des_jardins_partages_a_paris&rows=100&sort=-arrdt&facet=arrdt&facet=charte'; 

	// requête ajax pour récupérer les données en dynamique en premier paramètre l'url, puis la fonction callBack qui récupère les données pour les traiter en suite
	$.getJSON(url, function(result){
		// création du conteneur qui va accueillir chaque liste d'information
		var ul = document.createElement('ul');
		// on traite enfin les information dans une boucle pour récupérer ce que l'on veut dans chaque tableau de l'objet
		for(var i = 0; i < result.records.length; i++){
			// qu'on stock dans une li
			var li = document.createElement('li');
			// puis qu'on affiche dans dans le HTLM(c'est ce qui se trouve dessus la carte dans l'encadré blanc)
			li.innerHTML = result.records[i].fields.arrdt +'<sup>arr</sup>'+ ' - ' + result.records[i].fields.nom_ev + ' - ' + result.records[i].fields.adresse;
			// ul devient le parent de li, c'est à dire la boite dans laquelle on va mettre les li
			ul.appendChild(li);


			// Ici je nomme toutes les variables necessaires à l'affichage que je désir dans la carte de Google
			var arrdt = result.records[i].fields.arrdt;
			var nom = result.records[i].fields.nom_ev;
			var adresse = result.records[i].fields.adresse;
			var lat = result.records[i].fields.geo_point_2d[0];
			var lng = result.records[i].fields.geo_point_2d[1];

			// création des options du marqueur			
			var optionsMarqueur = {
				// création de l'objet GPS pour donner des points d'ancrage à chaque marqueur en fonction de l'amplacement des jardins
				position: new google.maps.LatLng(lat, lng),
				// de la carte en question
				map: map,
				// title servira à donner le nom du jardin (stocké dans la variable nom) au survol de ce dernier
				title: nom
			};
			//puis création de l'objet marqueur en question, qui prend pour paramètre les options du marqueur
			let marqueur = new google.maps.Marker(optionsMarqueur);
			
			// création de l'infowindow (fenêtre avec des informations supplémentaires) 
	        let infowindow = new google.maps.InfoWindow({
	          content: arrdt + '<sup>ème</sup>  Arrondissement' + '<pre></pre>' +'Nom du jardin : '+ nom + '<pre></pre>'+ 'Où le trouver : ' + adresse
	        });

			//j'ajoute un evenement click sur le marqueur dans la carte pour ouvrir un infowindow
     		marqueur.addListener('click', function(){
     			// infowindow s'ouvre au click sur le marqueur 
          		infowindow.open(map, marqueur);
        	});

		}
		// puis en fin de boucle, le main devient parent d'Ul
		var main = document.getElementById('main').appendChild(ul);
	});
}

