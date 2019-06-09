/**
* Romain Capocasale
* Vincent Moulin
* He-Arc - INF2dlm-A
* 2018-2019
* Projet cours d'algorithme
*/

/**
 * Classe contenant les méthode pour lire des fichier json
 */
class JsonReader{

  /**
   * lit le contenu du fichier JSON
   * @param  {String} path chemin relatif où se trouve le fichier json
   * @return {String}      contenu du fichier JSON sous forme de texte
   */
  static readJsonFile(path){
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
}
