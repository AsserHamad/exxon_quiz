$(document).ready(function() {
  var checked = false;

  $("#login_div").on('keyup', (e) => {
    if (e.keyCode === 13){
      $("#login_btn").click();
    }

    else if (e.keyCode === 27){
      $("#login_modal").modal('hide');
    }
});

$("#reg_text").hide();
$(".reg_fields").hide();
$("#check").on('click',function(){
  if(!checked){
    // $("#reg_text").show('slide', {direction: 'right'}, 1000);
    // $("#login_text").hide('slide', {direction: 'right'}, 1000);
    $("#reg_text").show();
    $("#login_text").hide();
    $(".reg_fields").slideDown();
  }else{
    // $("#login_text").show('slide', {direction: 'left'}, 1000);
    // $("#reg_text").hide('slide', {direction: 'left'}, 1000);
    $("#login_text").show();
    $("#reg_text").hide();
    $(".reg_fields").slideUp();
  }
  checked=!checked;
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
  }, 0);


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
  		speed: 250,
  		borderColor: 'none',
  		activeColor: 'white',
  		color: 'white',
  		fontSize: '9em',
  		direction: 'both'
  	});
});
