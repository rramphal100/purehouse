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
    
    $('#search').keypress(function(e){
      if(e.keyCode==13){
        $(location).attr("href", "/schoolselect");
      }
    });

    $('.modal-trigger').on('click', function(){
        $('.modal').modal();
    });

});
