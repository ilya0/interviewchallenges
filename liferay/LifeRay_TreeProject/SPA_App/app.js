$( document ).ready(function() {

console.log("javascript connected");

var engine = new Object({
   routes: ['*.html', '/site/*'],
   enabled: true, //true means to go through ajax, false is to go through regular page rerouting
    } );


function directto(routenumber, hyperlink){

    console.log("button Clicked");

    if(engine.enabled = true){ // if the enabled is true, use ajax to go to next link
        $.ajax({url: routes[routenumber], 
            method: 'GET',
            headers: { 'Access-Control-Allow-Origin': '*'}, 
            success: function(result){ 
                console.log("ajax success"); // console.log the success

                $('body').text("body replaced with some sort of webpage stuff"); //replace the body of the page
            
            }
        });
    }else{ //if not go through routing and go to the next page
        window.location = hyperlink;
    }
};

$("p").text("Jquery loaded");

});