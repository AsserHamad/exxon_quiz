var questions;
$('document').ready(function(){
  window.onbeforeunload = function() {
  return "Data will be lost if you leave the page, are you sure?";
};
  var topScore;
  if(user)$("#admin").css('display',(user.role=='admin')?'inline' :'none');
  $("#button_single").on('click',function(){
    $("#button_multi").animate({opacity: 0, width: 0, display:'none'}, 500);
    $("#clicks").animate({marginTop:'3rem',width: '80%'},1000);
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
  $.get('/users/'+user._id+'/topscore')
  .done((res) => {
    $("#yourTopScore").html(Math.floor(res.score));
    console.log('Your actual top score is '+res.score);
  })
  .fail((err) => {
    topScore = 0;
    console.log('Your filthy non-existent top score is '+topScore+' with error '+err);
  })

  $("#submit_btnn").on('click',() => {
    
    $("#single_match").html(JSON.stringify(questions));

  })
});
