/**
* Romain Capocasale
* Vincent Moulin
* He-Arc - INF2dlm-A
* 2018-2019
* Projet cours d'algorithme
*/

class HashTable{
  constructor(path){
    this.json = JSON.parse(this._readJsonFile(path));
    this.hashtable = this.json.hashtable;
    this.hashTablLength = parseInt(this.json.length);
  }

  wordInHashTable(word){
    let hash = this.fn(word);

    if(hash <= this.hashTablLength){
      let listWord = this.hashtable[hash];

      return listWord.includes(word);
    }  else{
      return false;
    }
  }

  _readJsonFile(file)
  {
      let allText
      var rawFile = new XMLHttpRequest();
      rawFile.open("GET", file, false);
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
