$(document).ready(function(){
  init();
})

/**
 * init the index.html
 */
var init = function(){
  loadText("reception.html");
  createHandlersForTopBar();
}
/**
 * load html from a page to the main contener
 * @param  {[string]} htmlPage [name of the html page to retrieve data]
 */
var loadText = function(htmlPage){
  $.get(htmlPage)
    .done(function(data){
      $("#reception").html(data);
  }).error(function(data){
    console.log(data);
  });
}

/**
 * Creates the click listeners on the top li tags
 *
 */
var createHandlersForTopBar = function(){
  $(".toRetrieve").click(function(){
    var target = $(this).attr("src");
    $(".active").toggleClass("active");
    $(this).toggleClass("active");
    loadText(target);
  })

}
