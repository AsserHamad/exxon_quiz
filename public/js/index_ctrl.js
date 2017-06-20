$(document).ready(function() {

  $("#login_div").on('keyup', (e) => {
    if (e.keyCode === 13){
      $("#login_btn").click();
    }

    else if (e.keyCode === 27){
      $("#login_modal").modal('hide');
    }
});


$("#register_div").on('keyup', (e) => {
  if (e.keyCode === 13){
    $("#register_btn").click();
  }

  else if (e.keyCode === 27){
    $("#register_modal").modal('hide');
  }
});

  var glowy = false;
  setTimeout(function() {
    $("#logo").removeClass("glowing");
  }, 1000);


  $("#signup_btn").click(function() {


    $.post('/signup', credentials, (res) => {
      console.log(res);
      $("#singup_error").empty();
      if(res.accepted)
      window.location = '/';
      else if(res.info || res.err) {

        $("#login_error").html(res.info.message || JSON.stringify(res.err));
      }
      else if(res.not_accepted) {
        // TODO: hanlde logic here :
        alert('await acceptance mate!');
      }
    })
  })

  $("#login_btn").click(function() {

    $.post('/signin', $("#login_form").serialize())
      .done((res) => {
        if(res.accepted)
        window.location = '/';
        else if(res.not_accepted) {
          // TODO: handle logic here :
          alert('await acceptance mate!');
        }
      })
      .fail((res) => {
        $("#login_error").empty();
        res = res.responseJSON;

        if(res.info)
          $("#login_error").html(res.info.message);
        else
          $("#login_error").html(JSON.stringify(res.err));
      });
    });

  $('.quizmania').funnyText({
  		speed: 400,
  		borderColor: 'none',
  		activeColor: 'white',
  		color: 'white',
  		fontSize: '9em',
  		direction: 'both'
  	});
});
