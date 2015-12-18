$(document).ready(function(){
  init();
});

//TODO: build li array, activate the swipe with active

//@Param {int} current Position in the tabs for swiping purpose
var currentPosition = 0;
//@Param {array} array containing pages to load in ajax
var pagesArray = ["reception.html", "educ.html", "career.html"];
//@Param {array} array containing pages to load in ajax
var liIds = ["about", "education", "career"];

/**
 * init the index.html
 */
var init = function(){
  loadMainHtml("reception.html");
  createHandlersForTopBar();
  handleSwiping();
};


/**
 *load main html, the reception with a category and the skills section
 */
var loadMainHtml = function(target){
  loadHtml("reception", target);
  loadHtml("main", "skills.html");
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
}

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
}
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
}

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
}

/**
 * toogle the current active li when changing content
 * @param  {jQuery element} element the element to switch to active
 */
var toogleActiveLiTop = function(element){
  $(".active").toggleClass("active");
  element.toggleClass("active");
}

/**
 * Creates the click listeners on the top li tags
 */
var createHandlersForTopBar = function(){
  $(".toRetrieve").click(function(ev){
    ev.preventDefault();
    var target = $(this).attr("data-src");
    toogleActiveLiTop($(this));
    currentPosition = checkCurrentPosition();
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
