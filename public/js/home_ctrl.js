$('document').ready(function(){
  if(user)$("#admin").css('display',(user.role=='admin')?'inline' :'none');
  $("#button_single").on('click',function(){
    $("#button_multi").animate({opacity: 0, width: 0, display:'none'}, 500);
    $("#clicks").animate({marginTop:'10rem',width: '80%'},1000);
    $("#button_single").css('animation','single_transition 2s forwards');
  });
  $("#button_multi").on('click',function(){
    alert('You got friends, eh?');
  });
});
