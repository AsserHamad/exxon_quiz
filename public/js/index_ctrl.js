$(document).ready(function() {

  $("#login_modal").on('keypress', (e) => {
    if (e.which == 13)
      $("#login_btn").click();
    }
  );

  var glowy = false;
  setTimeout(function() {
    $("#logo").removeClass("glowing");
  }, 1000);

  $("#login_btn").click(function() {
    const email = $("#login_email").val(),
      password = $("#login_password").val(),
      credentials = {
        email: email,
        password: password
      }

    $.post('/signin', credentials, (res) => {
      console.log(res);
      $("#login_error").empty();
      if(res.accepted)
      window.location = '/';
      else if(res.info || res.err) {

        $("#login_error").html(res.info.message || JSON.stringify(res.err));
      }
      else if(not_accepted) {
        // TODO: hanlde logic here :
        alert('await acceptance mate!');
      }
    })
  })
  $('.quizmania').funnyText({
  		speed: 400,
  		borderColor: 'none',
  		activeColor: 'white',
  		color: 'white',
  		fontSize: '9em',
  		direction: 'both'
  	});
});
