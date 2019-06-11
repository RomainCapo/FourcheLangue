/**
* Romain Capocasale
* Vincent Moulin
* He-Arc - INF2dlm-A
* 2018-2019
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
    this.nbCollision = parseInt(this.json.nbCollision);
    this.fillingRate = parseFloat(this.json.fillingRate);
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
 * @param {string} word mot à ajouter
 */
  addWord(word){
    if(this.wordInHashTable(word)){
      return false;
    }else{
      let hash = this.fn(word);
      this.hashtable[hash].push(word);
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

  /**
   * Tire un certains nombres de mot de la table de hachage de maniere aléatoire
   * @param  {Integer} nbWord nombre de mot a tirer
   * @return {Array}        retourne un tableau avec le nombre de mot demandé
   */
  drawRandomWord(nbWord){
    let words = []
    while(words.length <= nbWord){
      let random = Math.floor((Math.random() * this.hashTableLength));
      //console.log(random);
      if(this.hashtable[random].length > 0){
        this.hashtable[random].forEach(function(e){
          words.push(e);
        });
      }
    }
    return words;
  }

  /**
   * Calcule le temps d'accè moyen pour une table de hachage
   * @return {Float} temps moyen d'accès de la table de hachage en ms
   */
  getAverageAcessTime(){
    let words = this.drawRandomWord(20000);
    let totalTime = 0;
    words.forEach((e) =>{
      let t0 = performance.now();
      let hash = this.fn(e);
      this.hashtable[hash];
      let t1 = performance.now();
      totalTime += (t1 - t0);
    }, this);
    return totalTime / words.length;
  }
}
