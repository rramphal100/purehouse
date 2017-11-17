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

    $('.card').on('click', function(){
        $(this).find('.projectidstorage').submit();
    });

    $('#search').keypress(function(e){
      if(e.keyCode==13){
        $(location).attr("href", "/schoolselect");
      }

    });
});
