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
    this.json = JSON.parse(this._readJsonFile(path));
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
 * lit le contenu du fichier JSON
 * @param  {String} path chemin relatif où se trouve la table de hachage au format JSON
 * @return {String}      contenu du fichier JSON sous forme de texte
 */
  _readJsonFile(path)
  {
      let allText
      var rawFile = new XMLHttpRequest();
      rawFile.open("GET", path, false);
      rawFile.overrideMimeType('application/json');
      rawFile.onreadystatechange = function ()
      {
          if(rawFile.readyState === 4)
          {
              if(rawFile.status === 200 || rawFile.status == 0)
              {
                  allText = rawFile.responseText;
              }
          }
      }
      rawFile.send(null);
      return allText;
  }

/**
 * fonction de hachage
 * @param  {String}   string mot a passer dans la fonction de hachage
 * @return {Integer}        hash du mot passé en parametre
 */
  fn(string){
    let hash = 0;
    const C = 42;
    for(let i = 0; i < string.length; i++){
      hash += string.charCodeAt(i) * Math.pow(C,i)
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
      let random = Math.floor((Math.random() * this.hashTableLength) - 1);
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
   * @return {Float} temps moyen d'accès de la table de hachage
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
