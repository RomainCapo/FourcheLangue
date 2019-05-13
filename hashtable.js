

class HashTable{
  constructor(){
    this.json;
  }

readTextFile(file)
{
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                var allText = rawFile.responseText;
                console.log(JSON.parse(allText));
            }
        }
    }
    rawFile.send(null);
}

  fn(string){
    let hash = 0;
    const C = 42;
    for(let i = 0; i < string.length; i++){
      hash += string.charCodeAt(i) * Math.pow(C,i)
    }
    return hash % this.hashTableLength
  }

  test(){
    return "A".charCodeAt();
  }
}
