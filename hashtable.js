class HashTable{
  constructor(){
    let array = [''];
    let length = array.length * 2;
  }

  fn(cle){
    let hash = 0;
    do {
      hash += cle%10;
      cle /= length;
    } while (cle>0);
    return hash%length;
  }
}
