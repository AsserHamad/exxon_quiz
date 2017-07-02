$('document').ready(function(){
  window.onbeforeunload = function() {
  return "Data will be lost if you leave the page, are you sure?";
};
  var questions;
  if(user)$("#admin").css('display',(user.role=='admin')?'inline' :'none');
  $("#button_single").on('click',function(){
    $("#button_multi").animate({opacity: 0, width: 0, display:'none'}, 500);
    $("#clicks").animate({marginTop:'10rem',width: '80%'},1000);
    $("#button_single").css('animation','single_transition 2s forwards');
     setTimeout(() => {
      $("#single_match").css('animation','show_quiz 2s forwards');
    },1500);
  });
  $("#button_multi").on('click',function(){
    alert('You got friends, eh?');
  });
  $.get('/questions').done((res) => {
    questions = res;
  }).fail((err) => {
    alert('BEEP BOOP ERROR '+err);
  })
});
