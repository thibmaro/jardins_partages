var map;
var url;

function initMap() {
	map = new google.maps.Map(document.getElementById("myMap"),{
  	center: {lat: 48.866667, lng: 2.333333},
  	zoom: 13
	});
}

url = 'https://opendata.paris.fr/api/records/1.0/search/?dataset=liste_des_jardins_partages_a_paris&rows=100&sort=-arrdt&facet=arrdt&facet=charte'; 
$.getJSON(url, function(result){
	var ul = document.createElement('ul');
	for(var i = 0; i < result.records.length; i++){
		var li = document.createElement('li');
		li.innerHTML = result.records[i].fields.arrdt +'<sup>arr</sup>'+ ' - ' + result.records[i].fields.nom_ev + ' - ' + result.records[i].fields.adresse;
		ul.appendChild(li);

		
	}
	// console.log(result);
	var main = document.getElementById('main').appendChild(ul);
});


