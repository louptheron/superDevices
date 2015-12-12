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
            if(data.msg.toString() == "ok"){
                $("#alert").html("User created, <a href='/login'>log in</a> now!");
            }
            else {
                $("#alert").text(data.msg.toString());
            }
            $(".alert").show();
        }
    });
    event.preventDefault();
});

$( "#login" ).submit(function( event ) {
    $.ajax({
        url: '/login',
        type: 'post',
        data: {
            email : $('input[name=email]').val(),
            password : $('input[name=password]').val()
        },
        success: function(data) {
            window.location = "/";
        },
        error: function(data) {
                $("#alert").text("Wrong email/password...");
                $(".alert").show();
        }
    });
    event.preventDefault();
});

$( "#logout" ).click(function( event ) {
    $.ajax({
        url: '/logout',
        type: 'post',
        data: {},
        success: function(data) {
            location.reload();
        }
    });
    event.preventDefault();
});