class AutocompleteTree{
  constructor(){
    this.root = new Node("");
  }

  treeChildrenContain(children, value){
    let contain = false;
    let indice;
    for(let i = 0; i < children.length; i++){
      if(children[i].value == value){
        contain = true;
        indice = i;
        break;
      }
    }
    return [contain, indice];
  }

  getSubTreeRec(string, children=this.root.children ){
    let contain = this.treeChildrenContain(children, string[0])
    if(string == ""){
      return children;
    }

    if(!contain[0]){
      return -1;
    }else{
      return this.getSubTreeRec(string.substring(1), children[contain[1]].children)
    }
  }

  test(substring){
    let subtree = this.getSubTreeRec(substring);
    console.log(JSON.stringify(this.root));
  }

  addWord(word){
    let currentNode = this.root;

    let children = -1;
    if(this.root.children.length > 0){
      children = currentNode.children;
    }

    for(let i = 0; i <= word.length; i++){

      let contain = this.treeChildrenContain(children, word[i]);
      if(children != -1 && contain[0]){
        currentNode = currentNode.children[contain[1]];
        children = currentNode.children;
      }else{
        let node;
        if(i == (word.length)){
          node = new Node("#");
        }
        else
        {
          node = new Node(word[i]);
        }
        node.parent = currentNode.value;
        currentNode.children.push(node);
        currentNode = node;
      }
    }
  }
}
