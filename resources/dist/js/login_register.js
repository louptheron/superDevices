'use strict';
/* globals tools, toastr */

jQuery('.form-register').submit(function(e) {
  e.preventDefault();
  var password_ = jQuery('#register-password').val();
  var email_ = jQuery('#register-mail').val();
  var pseudo_ = jQuery('#register-pseudo').val();
  if (password_ === jQuery('#register-password-confirm').val() && email_ && password_ && pseudo_) {
    var data = {
      email: email_,
      pseudo: pseudo_,
      password: password_
    };
    tools.request('/register', data, function(msg) {
      switch (msg.msg) {
        case 'ok':
          toastr.success('Please check and validate your email', 'You are registered');
          break;
        case 'email exist':
          toastr.error('This email already exist', 'Can\'t register');
          break;
        default:
          toastr.error(msg.msg);
          break;
      }
    }, function(err) {
      toastr.error('Something went wrong ' + err.toString, 'Oops');
    });
  } else {
    toastr.warning('Passwords doesn\'t match or no email/pseudo', 'Something is not correct');
  }
});

jQuery('.form-login').submit(function(e) {
  e.preventDefault();
  var email_ = jQuery('#login-mail').val();
  var password_ = jQuery('#login-password').val();

  if (email_ && password_) {
    var data = {
      email: email_,
      password: password_
    };
    tools.request('/log-in', data, function(resp) {
      if (resp.msg === 'ok') {
        toastr.success('Log in successful', 'Welcome back !');
        tools.redirect('/');
      }
    }, function() {
      toastr.error('email or password doesn\'t match or exist', 'Wrong credentials');
      tools.redirect('/log-in');
    });
  }
});

jQuery('.form-login-full').submit(function(e) {
  e.preventDefault();
  var email_ = jQuery('#login-mail-full').val();
  var password_ = jQuery('#login-password-full').val();

  if (email_ && password_) {
    var data = {
      email: email_,
      password: password_
    };
    tools.request('/log-in', data, function(resp) {
      if (resp.msg === 'ok') {
        toastr.success('Log in successful', 'Welcome back !');
        tools.redirect('/');
      }
    }, function() {
      toastr.error('Wrong credentials', 'email or password doesn\'t match or exist');
    });
  }
});

jQuery('.btn-logout').on('click', function() {
  tools.request('/log-out', {}, null, function() {
    toastr.success('Log out successful', 'See you soon !');
    tools.redirect('/');
  });
});
