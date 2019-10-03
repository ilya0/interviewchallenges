var tree; // root tree structure

function runtree(){
    tree = new Tree(); // instantate root tree object
    tree.addValue(5);
    tree.addValue(6);
    tree.addValue(7);
    console.log(tree);
}

// root node constructor 
function Tree(){
    this.root = null
    //prototype.addNode
}

// root is null then creat root node
Tree.prototype.addValue = function(val){
    var n = new Node(val); // create new node

    if (this.root == null){ // if current node is null
        this.root = n 
        console.log("root is null")
    }else{
        this.root.addNode(n);
    }
}


function Node(val){
    this.value = val;
    this.left = null;
    this.right = null;
    //prototype.addNode
}

//creating a prototype in the node function in order to be able to create nodes on nodes
Node.prototype.addNode = function(n){
if(n.value < this.value ){
    if(this.left == null){
        this.left = n;
    }else{
        this.left.addNode(n);
    }
}else if(n.value > this.value){
    if(this.right == null){
        this.right = n;
    }else{
        this.right.addNode(n);
    }
}


}


