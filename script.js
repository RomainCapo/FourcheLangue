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

console.log(hashtables.french.getAverageAcessTime());

function init() {
  document.getElementById("language_infos").style.visibility = "hidden";
  document.getElementById("content_textarea").focus();
}

function getContent() {
  let values = document.getElementById("content_textarea").value;

  let regex = /[.,]/g;
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

function findLang(values_list) {
	for (let key in lang) {
	  lang[key] = 0;
	}

	for(let i in values_list) {
	 	for(let key_lang in lang) {
		 	if(hashtables[key_lang].wordInHashTable(values_list[i])) {
		 		lang[key_lang]++;
		 	}
	 	}
	}

	//console.log(lang);

	chooseLang(lang);
}

function chooseLang(lang) {

	let key = Object.keys(lang).reduce(function(a, b){ return lang[a] > lang[b] ? a : b });
	if(lang[key] >= 4) {
		changeImg(key);
	} else {
		removeImg();
	}
}
