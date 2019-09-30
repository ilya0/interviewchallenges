var tree; //tree structure

// run script
function setup(){
    noCanvas();
    tree = new TreeWalker();
    var n = new Node(5); 
    tree.addNode(n);
    
    console.log(tree);

  
}  
// root node
function Tree(){
        this.root = null;
    }  

function Node(val){
        this.value = val;
        this.left = null;
        this.right = null;
    }



    Tree.prototype.addNode = function(n){
      var n = new Node(val);
        if(this.root == null){
            this.root = n;
        }else{
            this.root.addNode(n);
        }

      }

      Node.prototype.addNode = function(n){
          if(n.value < this.value){
              if(this.left == null){
                this.left = n;
              }else{
                  this.left.addNode(n);
              }
              
          }else{
              this.right.addNode(n);

          }
      }
    

