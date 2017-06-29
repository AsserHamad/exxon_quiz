$('document').ready(function(){
  $("#button_single").on('click',function(){
    $("#button_multi").slideUp();
    $("#button_single").css('animation','single_transition 2s forwards');
  });
  $("#button_multi").on('click',function(){
    alert('You got friends, eh?');
  });
});
