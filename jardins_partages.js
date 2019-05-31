$.getJSON('https://opendata.paris.fr/api/records/1.0/search/?dataset=liste_des_jardins_partages_a_paris&rows=90&facet=arrdt&facet=charte', function(result){
	
	for(var i = 0; i < result.records.length; i++){
		console.log(result.records[i].fields.adresse);
		// console.log(result);
	}
	// console.log(result.records[0].fields.adresse);
});


// function getResult(result) {
// 	console.log(result);
// 	resultat = result;
// 	return resultat ;
// }
// console.log(resultat);