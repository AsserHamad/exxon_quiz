$('document').ready(function(){
  $("#admin").css('display',(user.role=='admin')?'inline' :'none');
  $("#button_single").on('click',function(){
    $("#button_multi").animate({opacity: 0, width: 0, display:'none'}, 1000);
    $("#button_single").css('animation','single_transition 2s forwards');
  });
  $("#button_multi").on('click',function(){
    alert('You got friends, eh?');
  });
});
