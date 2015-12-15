$(document).ready(function(){
  init();
});

/**
 * init the index.html
 */
var init = function(){
  loadMainHtml("reception.html");
  createHandlersForTopBar();
  handleReading();
};

/**
 *load main html, the reception with a category and the skills section
 *
 */
var loadMainHtml = function(target){
  loadHtml("reception", target);
  loadHtml("main", "skills.html");
};

/**
 * load html from a page to the main contener
 * @param  {[string]} id [id of the tag to load html into]
 * @param  {[string]} htmlPage [name of the html page to retrieve data]
 */
var loadHtml = function(id, htmlPage){
  $.get(htmlPage)
    .done(function(data){
      console.log(data);
      $("#" + id).html(data);
  }).error(function(data){
    console.log(data);
  });
};

/**
 * Creates the click listeners on the top li tags
 *
 */
var createHandlersForTopBar = function(){
  $(".toRetrieve").click(function(ev){
    ev.preventDefault();
    var target = $(this).attr("data-src");
    $(".active").toggleClass("active");
    $(this).toggleClass("active");
    $("#myIntro").show();
    loadMainHtml(target);
  });
};

/**
 * Handle the special case of click on readings
 */
var handleReading = function(){
  $("#reading").click(function(ev){
    ev.preventDefault();
    $("#myIntro").hide();
    $(".active").toggleClass("active");
    $(this).toggleClass("active");
    loadHtml("main", "readings.html");
  });
};
