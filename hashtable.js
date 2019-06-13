/**
* Romain Capocasale
* Vincent Moulin
* He-Arc - INF2dlm-A
* 13.06.2019
* Projet cours d'algorithme
*/

/**
 * Represente une table de hachage
 */
class HashTable{
  /**
   * constructeur de la table de hachage, on recupère la table de hahchage et la taille de la table a partir du fichier JSON
   * @param {String} path chemin relatif où se trouve la table de hachage au format JSON
   */
  constructor(path){
    this.json = JSON.parse(JsonReader.readJsonFile(path));
    this.hashtable = this.json.hashtable;
    this.hashTableLength = parseInt(this.json.length);
    this.numberWords = this.hashTableLength / 2;// la taille de la taille de hachage correponds à 2 fois le nombre de mot
    this.nbCollision = parseInt(this.json.nbCollision);
    this.fillingRate = parseFloat(this.json.fillingRate);
    this.avgAccessTime = parseFloat(this.json.avgAccessTime) / 1000; // temps en nanoseconde on divise par 1000 pour avoir des microsecondes
  }

  /**
   * indique si le mot passé en parametre est dans la table de hachage
   * @param  {String} word mot a traité
   * @return {Boolean}      indique si le mot est dans la table de hachage ou non
   */
  wordInHashTable(word){
    let hash = this.fn(word);

    if(hash <= this.hashTableLength){
      let listWord = this.hashtable[hash];

      return listWord.includes(word);
    }  else{
      return false;
    }
  }

/**
 * Permet d'ajouter un mot dans la table de hachage si il n'y est pas déjà
 * @param {String} word mot à ajouter
 */
  addWord(word){
    if(this.wordInHashTable(word)){
      return false;
    }else{
      let hash = this.fn(word);
      this.hashtable[hash].push(word);
      this.numberWords++;
      return true;
    }
  }

/**
 * fonction de hachage
 * @param  {String}   string mot a passer dans la fonction de hachage
 * @return {Integer}        hash du mot passé en parametre
 */
  fn(string){
    let hash = 0;
	const c = 5;
    for(let i = 0; i < string.length; i++){
      hash += Math.pow(string.charCodeAt(i), c) * (i+1);
    }
    return hash % this.hashTableLength;
  }
}
