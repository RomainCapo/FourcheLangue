/**
* Romain Capocasale
* Vincent Moulin
* He-Arc - INF2dlm-A
* 2018-2019
* Projet cours d'algorithme
*/

let hashFilePaths = [['french', 'hash/french.json'], ['english','hash/english.json'], ['deutsch','hash/deutsch.json'], ['italiano', 'hash/italiano.json'], ['spain', 'hash/espanol.json'], ['denmark', 'hash/dansk.json'], ['norsk', 'hash/norsk.json']];

let hashtables = [];
let lang = [];

hashFilePaths.forEach(function(e){
  hashtables[e[0]] = new HashTable(e[1]);
  lang[e[0]] = 0;
})

function init() {
  document.getElementById("language_infos").style.visibility = "hidden";
  document.getElementById("content_textarea").focus();
  displayInfosHashtables();
}

function displayInfosHashtables() {

	for(let key_lang in lang) {
		let numberWords = hashtables[key_lang].hashTableLength;
		let accessTime = 1000*hashtables[key_lang].getAverageAcessTime();
		let nbCollisions =  hashtables[key_lang].nbCollision;
		let fillingRateHashTables = hashtables[key_lang].fillingRate;
	 	let text = "";

		text += "Number of words : " + numberWords + "<br>";
		text += "Average time access : " + accessTime.toFixed(3) + " microseconds<br>";
		text += "Number of collisions : " + nbCollisions + "<br>";
		text += "Filling rate of the HashTable : " + fillingRateHashTables + "%<br>";

		document.getElementById(key_lang).innerHTML = text;
 	}
}

function getContent() {
  let values = document.getElementById("content_textarea").value;

  let regex = /[.,"]/g;
  let values_clear = values.replace(regex, '');
  let values_list = values_clear.split(' ');


  findLang(values_list);
}

function changeImg(language) {
	document.getElementById("language_infos").style.visibility = "visible";
	document.getElementById("img_lang").src="flags/" + language + ".png";
}

function removeImg() {
	document.getElementById("language_infos").style.visibility = "hidden";
}

function removePercentage() {
	document.getElementById("pourcentage").innerHTML = "";
}

function displayPercentage(key, lang, array) {

	let value = lang[key];
	let length = array.length;

	let percentage = ((value/length)*100).toFixed(2);

	document.getElementById("pourcentage").innerHTML = "Percentage that the detected language is correct : <strong>" + percentage + "%</strong>.";
}

function findLang(values_list) {
	for (let key in lang) {
	  lang[key] = 0;
	}

	for(let i in values_list) {
	 	for(let key_lang in lang) {
		 	if(hashtables[key_lang].wordInHashTable(values_list[i].toLowerCase())) {
		 		lang[key_lang]++;
		 	}
	 	}
	}

	chooseLang(lang, values_list);
}

function chooseLang(lang, values_list) {
	let lang_array = lang
	let key = Object.keys(lang).reduce(function(a, b){ return lang[a] > lang[b] ? a : b });
	if(lang[key] >= 4) {
		changeImg(key);
		findErrorForLang(key, values_list);
		displayPercentage(key, lang_array, values_list);
	} else {
		removeImg();
		removePercentage();
		colorText([]);
	}
}

function findErrorForLang(lang, values_list)
{
	let error_array = [];

  	for(let i in values_list) {
	 	if(!hashtables[lang].wordInHashTable(values_list[i].toLowerCase())) {
	 		error_array.push(values_list[i]);
	 	}
	}

  	colorText(error_array);
}

// Coloration

function colorText(error_array)
{
	let text = document.getElementById('content_textarea').value;

	let res = "";
	for (let i in error_array) {  
	  res = text.replace(error_array[i], "<span style=\"color:red\">" + error_array[i] + "</span>")
	  text = res;
	}

	document.getElementById('corrections').innerHTML = res;
}