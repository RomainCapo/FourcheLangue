/**
* Romain Capocasale
* Vincent Moulin
* He-Arc - INF2dlm-A
* 2018-2019
* Projet cours d'algorithme
*/

function init() {
  document.getElementById("language_infos").style.visibility = "hidden";
  document.getElementById("content_textarea").focus();
}

function getContent() {
  let values = document.getElementById("content_textarea").value;

  let regex = /[.,]/g;
  let values_clear = values.replace(regex, '');
  let values_list = values_clear.split(' ');

  document.getElementById("value").innerHTML = values_list;

  if (values_list[0] == "test") { changeImg("german"); } else { changeImg("italian"); }
}

function changeImg(language) {
	document.getElementById("language_infos").style.visibility = "visible";
	switch(language) {
	  case "german":
	    document.getElementById("img_lang").src="flags/german.png";
	    break;
	  case "italian":
	    document.getElementById("img_lang").src="flags/italian.png";
	    break;
	  case "english":
	    document.getElementById("img_lang").src="flags/english.png";
	    break;
	  case "spain":
	    document.getElementById("img_lang").src="flags/spain.png";
	    break;
	  case "french":
	    document.getElementById("img_lang").src="flags/french.png";
	    break;
	  default:
	}
}


(function(){
	let hashFilePaths = [['french', 'hash/french.json'], ['english','hash/english.json'], ['deutsch','hash/deutsch.json'], ['italiano', 'hash/italiano.json']];

	let hashtables = [];
	let lang = [];

	hashFilePaths.forEach(function(e){
	  hashtables[e[0]] = new HashTable(e[1]);
	  lang[e[0]] = [];
	})
	console.log(hashtables);
	console.log(lang);
})();
