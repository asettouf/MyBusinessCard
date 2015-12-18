//@Constant {int} Size in px of what is considered a small screen
var SMALLSCREENWIDTH = 600;

$(document).ready(function(){
  init();
});

//TODO: build li arrays

//@Param {int} current Position in the tabs for swiping purpose
var currentPosition = 0;
//@Param {array} array containing pages to load in ajax
var pagesArray = ["reception.html", "educ.html", "career.html"];
//@Param {array} array containing pages to load in ajax
var liIds = [];

/**
 * init the index.html
 */
var init = function(){
  buildLiArray();
  loadMainHtml("reception.html");
  createHandlersForTopBar();
  handleSwiping();
  handleSkillClick();
};

/**
 * create the li tags array to provide for swiping
 */
var buildLiArray = function(){
  var elements = $(".toRetrieve");
  var i = 0;
  for (i; i<elements.length ; i++){
    liIds[i] = elements[i].id;
  }
  console.log(liIds);
};
/**
 *load main html, the reception with a category and the skills section
 */
var loadMainHtml = function(target){
  loadHtml("reception", target);
  //loadHtml("main", "skills.html");

};

/**
 * load html from a page to the main contener
 * @param {string} id id of the tag to load html into
 * @param {string} htmlPage name of the html page to retrieve data
 */
var loadHtml = function(id, htmlPage){
  $.get(htmlPage)
    .done(function(data){
      //console.log(data);
      $("#" + id).html(data);
  }).error(function(data){
    console.log(data);
  });
};


/**
 * Handle swipes from a mobile device
 */
var handleSwiping = function(){
  $( "#reception" ).on( "swiperight", swipeRightHandler );
  $( "#reception" ).on( "swipeleft", swipeLeftHandler );
};

var checkCurrentPosition = function(){
  var pageName = $(".active")[0].id;
  var res = 0;
  var i = 0;
  console.log(pageName);
  for (i; i<liIds.length; i++){
    res = (pageName === liIds[i] ? i: 0);
    console.log(liIds[i]);
  }
  return res;
};
/**
 * Handles swipe right
 * @param  {Javascript event} event The triggered event on swipe right
 */
var swipeRightHandler = function(event){
  if (currentPosition > 0){
      currentPosition--;
      toogleActiveLiTop($("#" + liIds[currentPosition]));
      loadMainHtml(pagesArray[currentPosition]);
  } else if(currentPosition == 0){
    console.log("Nothing left");
  } else{
    console.log("An error occured");
  }
};

/**
 * Handles swipe left
 * @param  {Javascript event} event The triggered event on swipe left
 */
var swipeLeftHandler = function(event){
  if (currentPosition < pagesArray.length - 1){
      currentPosition++;
      toogleActiveLiTop( $("#" +liIds[currentPosition]));
      loadMainHtml(pagesArray[currentPosition]);
  } else if(currentPosition == pagesArray.length - 1){
    console.log("Nothing right");
  } else{
    console.log("An error occured");
  }
};

/**
 * toogle the current active li when changing content
 * @param  {jQuery element} element the element to switch to active
 */
var toogleActiveLiTop = function(element){
  $(".active").toggleClass("active");
  element.toggleClass("active");
};

/**
 * Scroll to an element with some smoothing
 * @param  {string} element A tag, formatted in css for jQuery
 */
var scrollToElement = function(element){
  console.log("Scrolling");
  $("html, body").animate({
    scrollTop: $(element).offset().top
  }, 1000);
};

/**
 * Creates the click listeners on the top li tags
 */
var createHandlersForTopBar = function(){
  var scroller = scrollToElement;
  $(".toRetrieve").click(function(ev){
    ev.preventDefault();
    var target = $(this).attr("data-src");
    toogleActiveLiTop($(this));
    currentPosition = checkCurrentPosition();
    $("#myIntro").show();
    loadMainHtml(target);
    $(window).width() < SMALLSCREENWIDTH ? scroller("#reception "): "";
  });
};

var handleSkillClick = function(){
  var scroller = scrollToElement;
  if ($(window).width() < SMALLSCREENWIDTH){
    $("#skills").click(function(ev){
      ev.preventDefault();
      scroller("#main");
    });
  }

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
