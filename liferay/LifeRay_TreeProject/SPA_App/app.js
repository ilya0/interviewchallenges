
console.log("javascript connected");

var engine = new Object({
   routes: ['*.html', '/site/*'],
   enabled: true, //true means to go through ajax, false is to go through regular page rerouting
    } );


var link = function(routenumber,hyperlink){

    console.log("button Clicked");

    if(engine.enabled = true){
        $.ajax({url: routenumber, success: function(result){
        console.log("ajax success");
        }});
    }else{
        window.location = hyperlink;
    }



};

$("p").text("Jquery loaded");