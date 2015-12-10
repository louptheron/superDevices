/**
 * Created by rouxbot on 09/12/15.
 */
'use strict';
/* globals tools, toastr */

$(".alert").hide();

$( "#connectDevice" ).submit(function( event ) {
    $.ajax({
        url: '/device/connect',
        type: 'post',
        data: {
            deviceName : $('input[name=deviceName]').val(), deviceUID : $('input[name=deviceUID]').val()
        },
        success: function(data) {
            $(".close").alert();
            if(data.msg.toString() == "ok"){
                $("#alert").text("Device connected !");
                $(".alert").show();
            }
            else {
                $("#alert").text(data.msg.toString());
                $(".alert").show();
            }
        }
    });
    event.preventDefault();
});

$( ".state" ).each(function(index) {
    $(this)
        .bootstrapSwitch()
        .on( "switchChange.bootstrapSwitch", function() {
            $.ajax({
                url: '/device/changeState',
                type: 'post',
                data: {id : $(this).attr("value") },
                success: function(data) {
                    console.log(data);
                }
            });
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
                }
            });
        });
});
