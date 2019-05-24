/**
* Romain Capocasale
* Vincent Moulin
* He-Arc - INF2dlm-A
* 2018-2019
* Projet cours d'algorithme
*/

// Tableau deux dimensions contenant la langue comme et le chemin de la table de hachage correspondante
let hashFilePaths = [['french', 'hash/french.json'], ['english','hash/english.json'], ['deutsch','hash/deutsch.json'], ['italiano', 'hash/italiano.json'], ['spain', 'hash/espanol.json'], ['denmark', 'hash/dansk.json'], ['norsk', 'hash/norsk.json']];

// Déclarations de variables globales
let hashtables = [];
let lang = [];

// Ajout d'un objet HashTable en passant en paramètre le chemin, et une mise à 0 à l'indice de la langue dans le tableau.
hashFilePaths.forEach(function(e){
  hashtables[e[0]] = new HashTable(e[1]);
  lang[e[0]] = 0;
})

// Fonction d'initialisation lors du chargement du body
function init() {
  document.getElementById("language_infos").style.visibility = "hidden"; // on cache l'affichage de la langue
  document.getElementById("content_textarea").focus(); // focus sur le textarea
  displayInfosHashtables();
}

// Fonction d'affichage des informations de les tables de hachage
function displayInfosHashtables() {

	// Itération sur chacune des langues du tableau
	for(let key_lang in lang) {
		// Récupération des informations dans des variables
		let numberWords = hashtables[key_lang].hashTableLength;
		let accessTime = 1000*hashtables[key_lang].getAverageAcessTime(); // *1000 pour avoir en micro secondes
		let nbCollisions =  hashtables[key_lang].nbCollision;
		let fillingRateHashTables = hashtables[key_lang].fillingRate;
	 	let text = "";

	 	// Concaténation des infos dans du html
		text += "Number of words : " + numberWords + "<br>";
		text += "Average time access : " + accessTime.toFixed(3) + " microseconds<br>";
		text += "Number of collisions : " + nbCollisions + "<br>";
		text += "Filling rate of the HashTable : " + fillingRateHashTables + "%<br>";

		// Affichage des données dans les différents id présents dans index.html
		document.getElementById(key_lang).innerHTML = text;
 	}
}

// Fonction qui récupère le contenu du textarea
function getContent() {
  let values = document.getElementById("content_textarea").value;

  let regex = /[.,"]/g; // Expression régulière pour retirer les caractères . , et "
  let values_clear = values.replace(regex, ''); 
  let values_list = values_clear.split(' '); // On génère un tableau en séparant à chaque espace

  findLang(values_list);
}


// Fonction qui prend en paramètre une langue pour mettre à jour le drapeau
function changeImg(language) {
	document.getElementById("language_infos").style.visibility = "visible"; // On affiche le texte
	document.getElementById("img_lang").src="flags/" + language + ".png"; // on ajoute dynamiquement le lien de l'image selon le paramètre
}

// Fonction qui cache le texte de l'image
function removeImg() {
	document.getElementById("language_infos").style.visibility = "hidden";
}

// Fonction qui remet à zéro le texte du pourcentage
function removePercentage() {
	document.getElementById("pourcentage").innerHTML = "";
}

// Fonction qui affiche le pourcentage de justesse de détection de la langue
function displayPercentage(key, lang, array) {

	let value = lang[key]; // récupération nombre de mots dans la langue détecté
	let length = array.length;

	let percentage = ((value/length)*100).toFixed(2); // on calucle le pourcentage entre le nombre de mots de la langue et le nombre de mots totaux

	document.getElementById("pourcentage").innerHTML = "Percentage that the detected language is correct : <strong>" + percentage + "%</strong>.";
}

// Fonction qui trouve la langue
function findLang(values_list) {
	for (let key in lang) {
	  lang[key] = 0; // Remise à zéro de tous les indices
	}

	for(let i in values_list) {
	 	for(let key_lang in lang) {
		 	if(hashtables[key_lang].wordInHashTable(values_list[i].toLowerCase())) { 
		 		// Si le mot est dans une table de 
		 		// hachage, on incrémente la valeur de la langue dans laquelle il est
		 		lang[key_lang]++;
		 	}
	 	}
	}

	chooseLang(lang, values_list);
}

// Fonction qui décide selon le tableau quelle est la langue
function chooseLang(lang, values_list) {
	let lang_array = lang
	let key = Object.keys(lang).reduce(function(a, b){ return lang[a] > lang[b] ? a : b }); // retourne la clé qui contient la plus grande valeur
	if(lang[key] >= 4) { // à partir de 4 mots dans une langue on commence à détecter
		changeImg(key); // changement du drapeau
		findErrorForLang(key, values_list); // on toruve les erreurs
		displayPercentage(key, lang_array, values_list); // on affiche le pourcentage
	} else { // si moins de mots
		removeImg(); // on retire l'image, le pourcentage et on vide le tableau à colorer
		removePercentage();
		colorText([]);
	}
}

// Fonction qui cherche erreurs dans le text selon un langue donnée en paramètre
function findErrorForLang(lang, values_list)
{
	let error_array = [];

  	for(let i in values_list) {
	 	if(!hashtables[lang].wordInHashTable(values_list[i].toLowerCase())) {
	 		error_array.push(values_list[i]); // Si un mot n'est aps dans la table de hachage de la langue détectée, on l'ajoute dans un tableau
	 	}
	}

  	colorText(error_array);
}

// Fonction qui a pour but de colorer les mots contenu dans un tableau
function colorText(error_array)
{
	let text = document.getElementById('content_textarea').value;

	let res = "";
	for (let i in error_array) {  
	  // On remplace les mots contenu dans le tableau d'erreur, en les entourant avec des span coloré
	  res = text.replace(error_array[i], "<span style=\"color:red\">" + error_array[i] + "</span>") 
	  text = res;
	}

	document.getElementById('corrections').innerHTML = res;
}