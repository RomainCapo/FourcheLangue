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
    this.hashTablLength = parseInt(this.json.length);
  }

  /**
   * indique si le mot passé en parametre est dans la table de hachage
   * @param  {String} word mot a traité
   * @return {Boolean}      indique si le mot est dans la table de hachage ou non
   */
  wordInHashTable(word){
    let hash = this.fn(word);

    if(hash <= this.hashTablLength){
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
    return hash % this.hashTablLength;
  }

  test(){
    return "A".charCodeAt();
  }
}
