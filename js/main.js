$(document).ready(function(){
  loadText("reception.html");
})

var loadText = function(htmlPage){
  $.get(htmlPage)
    .done(function(data){
      $("#reception").html(data);
  }).error(function(data){
    console.log(data);
  });
}

var cickTopElementHandler = function(){
    
}
