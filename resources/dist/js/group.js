
'use strict';

$(".alert").hide();

$( "#connectGroup" ).submit(function( event ) {
    $.ajax({
        url: '/group/connect',
        type: 'post',
        data: {
            groupName : $('input[name=groupName]').val()
        },
        success: function(data) {
            if(data.msg.toString() == "ok"){
                $("#alert").text("Device connected !");
                location.reload();
            }
            else {
                $("#alert").text(data.msg.toString());
            }
            $(".alert").show();
        }
    });
    event.preventDefault();
});

$( ".stateGroup").each(function(index) {
    $(this)
        .bootstrapSwitch()
        .on( "switchChange.bootstrapSwitch", function() {
            var splitedValues = $(this).attr("value").split("+");
            if(splitedValues[1] === "true" || splitedValues[1] === "false"){
                $.ajax({
                    url: '/group/changeState',
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

$('.deleteGroup').each(function(index) {
    $(this)
        .click(function () {
            $.ajax({
                url: '/group/delete',
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
$('.showDevicesGroup').each(function(index) {
    $(this)
        .click(function () {
            var splitedValues = $(this).attr("value").split("+");
            $.ajax({
                url: '/group/show',
                type: 'post',
                data: {id : splitedValues[0],
                    name : splitedValues[1]},
                success: function (data) {
                    $('#tDevices').empty();
                    $('#titleGroup').text("Remove a Device for -"+data.groupName+"- Group");
                    $.each(data.devices,function(i,val){
                        $('#tDevices').append("<tr><td>"+val.deviceName+"</td><td><button class='btn btn-danger btn-xs removeDev' value='"+val._id+"+"+splitedValues[0]+"'><span class='glyphicon glyphicon-remove' aria-hidden='true'></span>Remove Device</button></td></tr>");
                    });
                }
            });
        });
});
$('.addDevicesGroup').each(function(index) {
    $(this)
        .click(function () {
            var splitedValues = $(this).attr("value").split("+");
            $.ajax({
                url: '/group/add',
                type: 'post',
                data: {
                    id : splitedValues[0],
                    name : splitedValues[1]
                },
                success: function (data) {
                    $('#tabDevices').empty();
                    $('#titleGroup').text("choose a Device for -"+data.groupName+"- Group");
                    $.each(data.devices,function(i,val){

                        $('#tabDevices').append("<tr><td>"+val.deviceName+"</td><td><button class='btn btn-success btn-xs chooseDev' value='"+val._id+"+"+splitedValues[0]+"'><span class='glyphicon glyphicon-plus' aria-hidden='true'></span>Add Device</button></td></tr>");
                    });
                }
            });
        });
});

$('#tabDevices').on('click', '.chooseDev', function(){
    var splitedValues = $(this).attr("value").split("+");
    $.ajax({
        url: '/group/addDevice',
        type: 'post',
        data: {
            idGroup : splitedValues[1],
            idDevice : splitedValues[0]},
        success: function(data) {
            if(data.msg.toString() == "ok"){
                alert("ok");
            }
            else {
                alert(data.msg.toString());
            }
        }
    });
});
$('#tDevices').on('click', '.removeDev', function(){
    var splitedValues = $(this).attr("value").split("+");
    $.ajax({
        url: '/group/removeDevice',
        type: 'post',
        data: {
            idGroup : splitedValues[1],
            idDevice : splitedValues[0]},
        success: function(data) {
            if(data.msg.toString() == "ok"){
                alert("ok");
            }
            else {
                alert(data.msg.toString());
            }
        }
    });
});