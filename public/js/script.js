$(function(){
    $("#contactButton").on('click', function(){
        $("#contactModal").modal('show');
    });

    $('#rateButton').on('click', function(){
        $('#rateModal').modal('show');
    });

    $('#reviewSubmit').on('click', function(){
        $.ajax({
            type: "POST",
            url: "/review",
            data: {
                reviewee: $('#profileID').val(),
                reviewer: $('#userID').val(),
                reviewText: $('#reviewBody').val()
            }
          });
    });

    $('.productcard').on('click', function(){
        $(this).find('.projectidstorage').submit();
    });

    $('.rolesubmit').on('click', function(){
        $(this).find('.roleidcontainer').submit();
    });
    
    $('#search').keypress(function(e){
      if(e.keyCode==13){
        $(location).attr("href", "/schoolselect");
      }
    });

    $($('h5.small-description')[0]).on('click', function(){
        $('#teamform').submit();
    });

});
