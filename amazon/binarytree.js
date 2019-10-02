var tree; //tree structure

// **** run script ***
function setup(){
    noCanvas();
    tree = new Tree();
    tree.addNode(new Node(5));
    
    console.log(tree);

  
}  
// root node constructor
function Tree(){
        this.root = null;
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



//child node construtor
function Node(val){
        this.value = val;
        this.left = null;
        this.right = null;
}


      //node functionality  - recursion

Node.prototype.addNode = function(n){
         //if value incoming is less than current node value
        if(n.value < this.value){

                //if left node doesnt exist to this node, set n to left node
                if(this.left == null){ 
                    this.left = n; 
                }else{
                    this.left.addNode(n) // if node exists add node
                }

        //else if input value is greater than current node value
        }else if (n.value > this.value){
            //if the right node is null set it to n     
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

    //go through the tree
Tree.prototype.traverse = function(){
        this.root.visit
    }
      
Tree.prototype.search = function(val){
    if(this.value == val){
        return this
    }else if (val < this.value && this.left != null){

    }else if (val > this.value && this.right != null){
        
    }
    return null;
}

