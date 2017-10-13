$(function(){
    $("#contactButton").on('click', function(){
        $("#contactModal").modal('show');
    });

    $('#rateButton').on('click', function(){
        $('#rateModal').modal('show');
    });

    $("#rateYo").rateYo({
        onSet: function (rating, rateYoInstance) {
            rating = Math.ceil(rating);
            $('#rating_input').val(rating);

         }
    });

    $('#reviewSubmit').on('click', function(){
        $.post("/review", {
            reviewee = $('#profileID').val(),
            reviewer = $('#userID').val(),
            reviewText = $('#reviewBody').val()
        });
    });

});