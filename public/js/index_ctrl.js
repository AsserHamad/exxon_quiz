$(document).ready(function() {
  var checked = false;
  function reg(credentials){
    $.post('/signup', credentials)
      .done((res) => {
        console.log(res);
        alert('await acceptance mate!');
      })
      .fail((res) => {
        console.log(JSON.stringify(res));
        $("#err").empty();
        res = res.responseJSON;

          $("#err").html(res.message);
      })
  };

  function login(credentials){
    $.post('/signin', credentials)
      .done((res) => {
        if(res.accepted)
        window.location = '/home';
        else if(res.not_accepted) {
          // TODO: handle logic here :
          alert('await acceptance mate!');
        }
      })
      .fail((res) => {
        $("#err").empty();
        res = res.responseJSON;

        if(res.info)
          $("#err").html(res.message);
        else
          $("#err").html(JSON.stringify(res.err));
      });
  }

$("#reg_text").on('click', () => {
    checked = true;
    $("#login_text").removeClass("check_text0");
    $("#login_text").addClass("check_text1");
    $("#reg_text").removeClass("check_text1");
    $("#reg_text").addClass("check_text0");
    $("#check").css({transform:'rotate(180deg)'});
    $("#check").css({animation:'shaking_tire1 2s ease infinite'});
    $(".reg_fields").show();
})

$("#login_text").on('click', () => {
  checked = false;
  $("#login_text").removeClass("check_text1");
  $("#login_text").addClass("check_text0");
  $("#reg_text").removeClass("check_text0");
  $("#reg_text").addClass("check_text1");
  $("#check").css({transform:'rotate(0deg)'});
  $("#check").css({animation:'shaking_tire0 2s ease infinite'});
  $(".reg_fields").hide();
})

$("#submit_btn").click(() => {
  checked ? reg($("#log_reg").serialize()) : login($("#log_reg").serialize());
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
})
