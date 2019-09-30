var tree;
function setup(){
    noCanvas();
    tree = new TreeWalker();
    var n = new Node(5); // run test
    tree.addNode(n);
    
    console.log(tree);

  
}  
// root node
function Tree(){
        this.root = null;
    }

    Tree.prototype.addNode = function(n){
        if(this.root == null){
            this.root = n;
        }
    }