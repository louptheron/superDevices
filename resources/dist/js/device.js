/**
 * Created by rouxbot on 09/12/15.
 */
'use strict';

$(".alert").hide();

$( "#connectDevice" ).submit(function( event ) {
    $.ajax({
        url: '/device/connect',
        type: 'post',
        data: {
            deviceName : $('input[name=deviceName]').val(), deviceUID : $('input[name=deviceUID]').val()
        },
        success: function(data) {
            if(data.msg.toString() == "ok"){
                $("#alert").text("Device connected !");
            }
            else {
                $("#alert").text(data.msg.toString());
            }
            $(".alert").show();
        }
    });
    event.preventDefault();
});

$( ".state" ).each(function(index) {
    $(this)
        .bootstrapSwitch()
        .on( "switchChange.bootstrapSwitch", function() {
            var splitedValues = $(this).attr("value").split("+");
            if(splitedValues[1] === "true" || splitedValues[1] === "false"){
                $.ajax({
                    url: '/device/changeState',
                    type: 'post',
                    data: {
                        id : splitedValues[0],
                        state : splitedValues[1]},
                    success: function(data) {
                        console.log(data);
                    }
                });
            }
            else {
                console.log("wrong parameters")
            }
        });
});

$('.delete').each(function(index) {
    $(this)
        .click(function () {
            $.ajax({
                url: '/device/delete',
                type: 'post',
                data: {id: $(this).attr("value") },
                success: function (data) {
                    if(data.msg.toString() == "ok"){
                        location.reload();
                    }
                    else {
                        $("#alert").text(data.msg.toString());
                        $(".alert").show();
                    }
                }
            });
        });
});
