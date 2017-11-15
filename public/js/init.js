(function($){
  $(function(){
    // Initialize collapse button
    $(".button-collapse").sideNav();
    // Initialize collapsible (uncomment the line below if you use the dropdown variation)
    //$('.collapsible').collapsible();

    $(".side-nav-toggle").click(function(){
      $('.button-collapse').sideNav('show');
    });
  }); // end of document ready
})(jQuery); // end of jQuery name space
