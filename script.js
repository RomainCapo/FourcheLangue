/**
* Romain Capocasale
* Vincent Moulin
* He-Arc - INF2dlm-A
* 13.06.2019
* Projet cours d'algorithme
*/

//Contiendra à l'initialisation le nom des tables de hachages et leurs chemins
let hashFilePaths;

// Déclarations de variables globales
let hashtables = [];//contient les tables de hachages
let lang = [];// contient la langue avec le nombre de mot détécter dans cette langue
let key = ""; //langue dans laquel le système à detecter le texte

// Correponds à l'highlighter sur le textearea
let highlighter = $('#content_textarea');

/**
* Fonction d'initialisation lors du chargement du body
*/
function init() {
  let isFirefox = typeof InstallTrigger !== 'undefined';

  //Si le navigateur est Firefox on execute le script normalement, sinon on affiche un message d'erreur
  if(isFirefox){
    //On récupére le contenu du fichier d'autoload contenant le nom des langues et le chemin jusqu'au table de hachage json
    hashFilePaths = JSON.parse(JsonReader.readJsonFile("autoload.json"))["lang"];

    // Ajout d'un objet HashTable en passant en paramètre le chemin, et une mise à 0 à l'indice de la langue dans le tableau.
    hashFilePaths.forEach(function(e){
      hashtables[e[0]] = new HashTable(e[1]);
      lang[e[0]] = 0;
    });

    document.getElementById("language_infos").style.visibility = "hidden"; // on cache l'affichage de la langue
    document.getElementById("content_textarea").focus(); // focus sur le textarea

    displayInfosHashtables();
  }else{
    document.getElementById("body").innerHTML = "<div class='container'><h1>Sorry ! The application works only in Firefox browser !</h1></div>";
  }


}

/**
* Fonction d'affichage des informations de les tables de hachage
*/
function displayInfosHashtables() {

	// Itération sur chacune des langues du tableau
	for(let key_lang in lang) {
		// Récupération des informations dans des variables
		let hashTableLength = hashtables[key_lang].hashTableLength;
		let numberWords = hashtables[key_lang].numberWords;
		let accessTime = hashtables[key_lang].avgAccessTime;
		let nbCollisions =  hashtables[key_lang].nbCollision;
		let fillingRateHashTables = hashtables[key_lang].fillingRate;
		let text = "";

		// Concaténation des infos dans du html
		text += "Number of words : " + numberWords + "<br>";
    text += "Length of the hashtable : " + hashTableLength + "<br>";
		text += "Average time access : " + accessTime.toFixed(3) + " microseconds<br>";
		text += "Number of collisions : " + nbCollisions + "<br>";
		text += "Filling rate of the HashTable : " + fillingRateHashTables + "%<br>";

		// Affichage des données dans les différents id présents dans index.html
		document.getElementById(key_lang).innerHTML = text;
	}
}

/**
* Fonction qui récupère le contenu du textarea
*/
function getContent() {
	let values = document.getElementById("content_textarea").value;

	let regex = /[.,"']/g; // Expression régulière pour retirer les caractères . , et "
	let values_clear = values.replace(regex, ' ');
	//let values_list = values_clear.match(/\w+|"[^']+"/g) // On génère un tableau en séparant à chaque espace et apostrophe

	let values_list = values_clear.split(" ");

	// Retire les cases vides du tableau
	values_list = values_list.filter(function(e){
		return e != "";
	})

	findLang(values_list);
}

/**
 * Permet d'indiquer si une image existe ou non
 * @param  {String} imageSrc chemin de l'image
 * @param  {Function} good     callback en cas de réussite
 * @param  {Function} bad      callback en cas d'erreur
 */
function checkImage(imageSrc, good, bad) {
    var img = new Image();
    img.onload = good;
    img.onerror = bad;
    img.src = imageSrc;
}

/**
* Fonction qui prend en paramètre une langue pour mettre à jour le drapeau
* @param  {String} language : drapeau qui doit être chargé
*/
function changeImg(language) {
	document.getElementById("language_infos").style.visibility = "visible"; // On affiche le texte

  let img = "flags/" + language + ".png";//chemin de l'image en fonction de la langue
  checkImage(img, function(){
    document.getElementById("img_lang").src = img;// on ajoute dynamiquement le lien de l'image selon le paramètre
   }, function(){
     console.error("The flag doesnt exist !");
   });
}

/**
* Fonction qui cache le texte de l'image
*/
function removeImg() {
	document.getElementById("language_infos").style.visibility = "hidden";
}

/**
* Fonction qui remet à zéro le texte du pourcentage
*/
function removePercentage() {
	document.getElementById("pourcentage").innerHTML = "";
}

/**
* Fonction qui affiche le pourcentage de justesse de détection de la langue
* @param  {String} key : clé de la langue détectée
* @param  {Array} lang : tableau des langues et leur valeur
* @param  {Array} array : tableau des mots du textarea
*/
function displayPercentage(key, lang, array) {

	let value = lang[key]; // récupération nombre de mots dans la langue détecté
	let length = array.length;

	let percentage = ((value/length)*100).toFixed(2); // on calcule le pourcentage entre le nombre de mots de la langue et le nombre de mots totaux

	document.getElementById("pourcentage").innerHTML = "Correct word percentage  : <strong>" + percentage + "%</strong>.";
}

/**
* Fonction qui trouve la langue
* @param  {Array} values_list : tableau des mots du texarea
*/
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

/**
* Fonction qui décide selon le tableau quelle est la langue
* @param  {Array} lang : tableau de langues et du nombre de mot détécté
* @param  {Array} values_list : tableau des mots du textarea
*/
function chooseLang(lang, values_list) {
	let lang_array = lang
	key = Object.keys(lang).reduce(function(a, b){ return lang[a] > lang[b] ? a : b }); // retourne la clé qui contient la plus grande valeur
	if(lang[key] >= 4) { // à partir de 4 mots dans une langue on commence à détecter
		document.getElementById('display_warning').innerHTML = "";
		changeImg(key); // changement du drapeau
		findErrorForLang(key, values_list); // on trouve les erreurs
		displayPercentage(key, lang_array, values_list); // on affiche le pourcentage

    document.getElementById('add_word_div').style.visibility = "visible";

	} else { // si moins de mots
		removeImg(); // on retire l'image, le pourcentage et on vide le tableau à colorer
		removePercentage();
		colorText([]);
		document.getElementById('display_warning').innerHTML = "<i>The language is not yet detected... you need to write more words !</i>";
		addPercentageForAllLang(lang, values_list);

    document.getElementById("add_word_div").style.visibility = "hidden";
	}
}

/**
 * Permet d'ajouter un mot dans la table de hachage
 * Si le mot est déjà présent on affiche un message
 * Sinon on met à jour l'highlighter et les infos de la table
 */
function addWord(){
	let word = document.getElementById("add_word_text").value.toLowerCase();
	word = word.split(" "); // on split pour prendre seulement le premier mot
	document.getElementById("add_word_text").value = "";
  console.log(word);

  //On verifie qu'il y a qu'un seul mot et qu'il n'est pas vide
	if(word.length > 1 || word[0] == "") {
		alert("Please enter a correct word !");
	} else {
		if(hashtables[key].addWord(word[0])){
			getContent();
      displayInfosHashtables();
		}else{
			alert("The word is already in the hashtable");
		}
	}
}

/**
 * Permet d'ajouter les pourcentages sur les langues détéctés
 * @param  {Array} lang : tableau de langues et leur valeur
 * @param  {Array} values_list : tableau des mots du textarea
 */
function addPercentageForAllLang(lang, values_list) {

	lang = sortProperties(lang, true);
	let total = 0;

	for (let i = 0; i < lang.length; i++) {
	  total += lang[i][1];
	}
	let text = "";

	if(values_list == null) {
		text += "";
	}
	else
	{
		text += "<ul>";

		for (let i = 0; i < lang.length; i++) {
		  	if(lang[i][1] > 0) {
		  		text += "<li>" + lang[i][0].charAt(0).toUpperCase() + lang[i][0].slice(1) + " : <strong>" + (lang[i][1]*(100/total)).toFixed(2) + "%</strong></li>";
		  	}
		}
		text += "</ul>";
	}
	document.getElementById('pourcentage').innerHTML = text;
}

/**
 * Trie les propriétés d'un objet (only own properties will be sorted).
 * Cette fonction vient de : https://gist.github.com/umidjons/9614157
 * @param {Object} obj objet avec les propriétés à trier
 * @param {Boolean} isNumericSort true - trie comme des valeurs numérique, false - trie comem des valeurs string
 * @returns {Array} tableu d'élément avec [[key,value],[key,value],...]
 */
function sortProperties(obj, isNumericSort)
{
	isNumericSort=isNumericSort || false; // by default text sort
	var sortable=[];
	for(var key in obj)
		if(obj.hasOwnProperty(key))
			sortable.push([key, obj[key]]);
	if(isNumericSort)
		sortable.sort(function(a, b)
		{
			return a[1]-b[1];
		});
	else
		sortable.sort(function(a, b)
		{
			var x=a[1].toLowerCase(),
				y=b[1].toLowerCase();
			return x<y ? -1 : x>y ? 1 : 0;
		});
	return sortable;
}

/**
* Fonction qui cherche erreurs dans le text selon un langue donnée en paramètre
* @param  {Array} lang : tableau des langues et leur valeur
* @param  {Array} values_list : tableau de smots du textarea
*/
function findErrorForLang(lang, values_list) {

	let error_array = [];

  	for(let i in values_list) {
	 	if(!hashtables[lang].wordInHashTable(values_list[i].toLowerCase())) {
	 		error_array.push(values_list[i]); // Si un mot n'est aps dans la table de hachage de la langue détectée, on l'ajoute dans un tableau
	 	}
	}
  	colorText(error_array, values_list);
}

/**
 * Crée une expression régulière avec tous les mots non reconnu pour l'highlighter de jQuery
 * L'expression recherche tous les mots et non les préfixes des mots
 * @param  {Array} error_array mot non reconnu
 * @return {RegExp}             expression régulière contenant tout les mots non reconnu
 */
function generateHighliterRegex(error_array){
  let regex = "";
  for(let i = 0; i < error_array.length; i++){
    regex+="\\b" + error_array[i] + "\\b";

    //si ce n'est pas le denier mot on doit placer le caractère |
    (i != error_array.length - 1) ? regex+="|":"";
  }
  return new RegExp(regex, "g");
}

/**
* Fonction qui a pour but de colorer les mots contenu dans un tableau
* @param  {Array} error_array : tableau des mots faux
*/
function colorText(error_array, values_list) {

  //Si le tableau n'est pas vide on génére l'expression régulière a partir du tableau de mot incorects
  if(error_array.length != 0){
     error_array = generateHighliterRegex(error_array);
  }
	highlighter.highlightWithinTextarea('destroy');

  //Coloration des mot en rouge sur le textarea
	highlighter.highlightWithinTextarea({
		highlight: error_array,
		className: 'red'
  });

	highlighter.focus();
}
