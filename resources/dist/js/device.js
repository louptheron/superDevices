/**
 * Created by rouxbot on 09/12/15.
 */
'use strict';
/* globals tools, toastr */



$('.state')
    .bootstrapSwitch()
    .on( "switchChange.bootstrapSwitch", function() {
            $.ajax({
                url: '/device/changeState',
                type: 'post',
                data: {id : $('.state').val()},
                success: function(data) {
                    console.log("changeDeviceState success");
                }
            });
    });


$('.delete').click(function() {
    $.ajax({
        url: '/device/delete',
        type: 'post',
        data: {id : $('.delete').val()},
        success: function(data) {
            console.log(data);
        }
    });
});
