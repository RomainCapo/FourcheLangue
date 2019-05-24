class Tree{
  constructor(){
    this.root = new Node("");
  }

  createTree(words){
    words.forEach((e) => {

      let currentNode = this.root;

      for(let i = 0; i <= e.length; i++){

        if(currentNode.children.includes(e[i])){
          currentNode
        }else{
          let node;
          if(i == (e.length)){
            node = new Node("#");
          }
          else
          {
            node = new Node(e[i]);
          }
          currentNode.children.push(node);
          currentNode = node;
        }
        console.log(currentNode);
      }
    });
  }

  _addNode(node){

  }

  display(node){
    console.log(node);
    node.children.forEach((e) =>{
      display(e);
    });
  }

  getNextChildren(node){
    return node
  }
}
