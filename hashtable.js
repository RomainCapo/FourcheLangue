class HashTable{
  constructor(){
    let array = ['3', '4', '5', '6'];
    let length = array.length * 2;
  }

  fn(cle){
    let hash = 0;
    do {
      hash += cle.charCodeAt()%this.length;
      console.log(hash);

      cle = cle.slice(0, cle.length-1);
      console.log(cle);
    } while (cle.length > 0);
    return hash%this.length;
  }

  test(){
    return "A".charCodeAt();
  }
}
