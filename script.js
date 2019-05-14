/**
* Romain Capocasale
* Vincent Moulin
* He-Arc - INF2dlm-A
* 2018-2019
* Projet cours d'algorithme
*/

let hashFilePaths = [['french', 'hash/french.json'], ['english','hash/english.json'], ['deutsch','hash/deutsch.json'], ['italiano', 'hash/italiano.json']];

let hashtables = [];

hashFilePaths.forEach(function(e){
  hashtables[e[0]] = new HashTable(e[1]);
})
console.log(hashtables);
