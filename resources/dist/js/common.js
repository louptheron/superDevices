/**
 * Created by distohm on 10/12/15.
 */
'use strict';

$( "#register" ).submit(function( event ) {
    $.ajax({
        url: '/register',
        type: 'post',
        data: {
            pseudo : $('input[name=pseudo]').val(),
            email : $('input[name=email]').val(),
            password : $('input[name=password]').val()
        },
        success: function(data) {
            $(".close").alert();
            if(data.msg.toString() == "ok"){
                $("#alert").html("User created, <a href='/login'>log in</a> now!");
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