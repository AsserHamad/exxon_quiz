$(document).ready(function(){
  var glowy = false;
  setTimeout(function(){$("#logo").removeClass("glowing");},1000);

  $("#login_btn").click(function(){
    alert("YOU HAVE CLICKED WHICH SHALL NOT BE CLICKEN");
    $.post('/signin',{email:$("#login_email").val(), password:$("#login_password").val()},function(res){
      console.log(res);
      if(res.success)
      window.location = '/';
    })
  })
});
