var tree; //tree structure

// run script
function setup(){
    noCanvas();
     tree = new Tree();
    var n = new Node(5); 
    tree.addNode(n);
    
    console.log(tree);

  
}  
// root node
function Tree(){
        this.root = null;
    }  

//creating a child node
function Node(val){
        this.value = val;
        this.left = null;
        this.right = null;
    }


//tree object has a function that will create a child node
    Tree.prototype.addNode = function(n){
      var n = new Node(val);

        if(this.root == null){
            this.root = n;
        }else{
            this.root.addNode(n);
        }

      }


      //node functionality  - recursion

    Node.prototype.addNode = function(n){

          if(n.value < this.value){

                if(this.left == null){ //if left node doesnt exist to this node, set n to left node
                    this.left = n;
                }else{
                    this.left.addNode(n) // if node exists add node
            }

        }else if (n.value > this,value){
                if(this.right == null){
                    this.right = n;
                }else{
                    this.right.addNode(n);
                }
                    
        }
              
    }
 

/// adding prototype visit to node
Node.prototype.visit = function(){
    if(this.left != null){
        this.left.visit();        
    }

    console.log(this.value);
    if(this.right != null){
        this.right.visit();
    }
}

    //search the tree
    Tree.prototype.traverse = function(){
        this.root.visit
    }
      
    

