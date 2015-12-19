

$(document).ready(function(){
  var main = new MainHandler()
  main.init();
});

function MainHandler(){
  //@Param {int} current Position in the tabs for swiping purpose
  this.currentPosition = 0;
  //@Param {array} array containing pages to load in ajax
  this.pagesArray = ["reception.html", "educ.html", "career.html"];
  //@Param {array} array containing pages to load in ajax
  this.liIds = [];
  //@Constant {int} Size in px of what is considered a small screen
  this.SMALLSCREENWIDTH = 600;
  /**
   * init the index.html
   */
  this.init = function(){
    this.buildLiArray();
    this.loadMainHtml("reception.html");
    this.createHandlersForTopBar();
    this.handleSwiping();
    this.handleSkillClick();
  };

  /**
   * create the li tags array to provide for swiping
   */
  this.buildLiArray = function(){
    var elements = $(".toRetrieve");
    var i = 0;
    for (i; i<elements.length ; i++){
      this.liIds[i] = elements[i].id;
    }
    console.log(this.liIds);
  };
  /**
   *load main html, the reception with a category and the skills section
   */
  this.loadMainHtml = function(target){
    this.loadHtml("reception", target);
    //loadHtml("main", "skills.html");

  };

  /**
   * load html from a page to the main contener
   * @param {string} id id of the tag to load html into
   * @param {string} htmlPage name of the html page to retrieve data
   */
  this.loadHtml = function(id, htmlPage){
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
  this.handleSwiping = function(){
    var that = this;
    $( "#reception" ).on( "swiperight", function(ev){
      that.swipeRightHandler(ev)
    });
    $( "#reception" ).on( "swipeleft", function(ev){
      that.swipeLeftHandler(ev)
    });
  };

  this.checkCurrentPosition = function(){
    var pageName = $(".active")[0].id;
    var res = 0;
    var i = 0;
    console.log(pageName);
    for (i; i<this.liIds.length; i++){
      res = (pageName === this.liIds[i] ? i: 0);
      console.log(this.liIds[i]);
    }
    return res;
  };
  /**
   * Handles swipe right
   * @param  {Javascript event} event The triggered event on swipe right
   */
  this.swipeRightHandler = function(event){
    if (this.currentPosition > 0){
        this.currentPosition--;
        this.toogleActiveLiTop($("#" + this.liIds[this.currentPosition]));
        this.loadMainHtml(this.pagesArray[this.currentPosition]);
    } else if(this.currentPosition == 0){
      console.log("Nothing left");
    } else{
      console.log("An error occured");
    }
  };

  /**
   * Handles swipe left
   * @param  {Javascript event} event The triggered event on swipe left
   */
  this.swipeLeftHandler = function(event){
    if (this.currentPosition < this.pagesArray.length - 1){
        this.currentPosition++;
        this.toogleActiveLiTop( $("#" +this.liIds[this.currentPosition]));
        this.loadMainHtml(this.pagesArray[this.currentPosition]);
    } else if(this.currentPosition == this.pagesArray.length - 1){
      console.log("Nothing right");
    } else{
      console.log("An error occured");
    }
  };

  /**
   * toogle the current active li when changing content
   * @param  {jQuery element} element the element to switch to active
   */
  this.toogleActiveLiTop = function(element){
    $(".active").toggleClass("active");
    element.toggleClass("active");
  };

  /**
   * Scroll to an element with some smoothing
   * @param  {string} element A tag, formatted in css for jQuery
   */
  this.scrollToElement = function(element){
    console.log("Scrolling");
    $("html, body").animate({
      scrollTop: $(element).offset().top
    }, 1000);
  };

  /**
   * Creates the click listeners on the top li tags
   */
  this.createHandlersForTopBar = function(){
    var scroller = this.scrollToElement;
    var that = this;
    $(".toRetrieve").click(function(ev){
      ev.preventDefault();
      var target = $(this).attr("data-src");
      that.toogleActiveLiTop($(this));
      that.currentPosition = that.checkCurrentPosition();
      $("#myIntro").show();
      that.loadMainHtml(target);
      $(window).width() < that.SMALLSCREENWIDTH ? scroller("#reception "): "";
    });
  };

  /**
   * scroll to skills section for small screens
   */
  this.handleSkillClick = function(){
    var scroller = this.scrollToElement;
    if ($(window).width() < this.SMALLSCREENWIDTH){
      $("#skills").click(function(ev){
        ev.preventDefault();
        scroller("#main");
      });
    }

  };
}
