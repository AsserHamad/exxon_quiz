var questions;
$('document').ready(function(){
  window.onbeforeunload = function() {
  return "Data will be lost if you leave the page, are you sure?";
};
  var topScore;
  if(user)$("#admin").css('display',(user.role=='admin')?'inline' :'none');
  $("#button_single").on('click',function(){
    $("#button_multi").animate({opacity: 0, width: 0, display:'none'}, 500);
    $("#trophy").animate({left:'75%'},3000);
    $("#clicks").animate({marginTop:'3rem',width: '80%'},1000);
    $("#button_single").css('animation','single_transition 2s forwards');
     setTimeout(() => {
      $("#single_match").css('animation','show_quiz 2s forwards');
    },1500);
  });
  $("#button_multi").on('click',function(){
    $("#button_single").animate({opacity: 0, width: 0, display:'none'}, 500);
    $("#trophy").animate({left:'75%'},3000);
    $("#clicks").animate({marginTop:'3rem',width: '80%'},1000);
    $("#button_multi").css('animation','multi_transition 2s forwards');
     setTimeout(() => {
      $("#single_match").css('animation','show_quiz 2s forwards');
    },1500);
  });
  $.get('/questions').done((res) => {
    questions=(res.length>0)?res:alert("No questions yet :/ the quiz is unplayable now");
  })
  $.get('/users/'+user._id+'/topscore')
  .done((res) => {
    $("#yourTopScore").html(Math.floor(res.score));
    console.log('Your actual top score is '+res.score);
  })
  .fail((err) => {
    topScore = 0;
  })

  $("#submit_btnn").on('click',() => {
    $("#countdown").css('animation','show_countdown 1s forwards');
    startQuiz();
    startCountdown();
  })
});
let q_count = 0;
let count_interval;
function startQuiz(){
  $("#single_match").html('<p style="font-size:200%;font-family:Bahiana;color:red;margin-top:3%;margin-bottom:3%;">Question '+(q_count+1)+'</p><p id="question">'+questions[q_count].text+'</p>')
  for(var i=0;i<4;i++){
    console.log(questions[0]);
    let fun = (questions[q_count].choices[i] == questions[q_count].correctAnswer)?'correct':'wrong';
    var x=(i==1)?"<br>":""
    $("#single_match").html($("#single_match").html()+'<buttonwidth="70" class=" col-xs-6 text-center butt '+fun+'">'+JSON.stringify(questions[q_count].choices[i])+'</button>'+x);
  }
  refreshClicks();
}

var count = 60;
function refreshClicks(){
  $(".correct").on('click',() => {
    console.log('You clicked on the right answer woohoo');
    if(q_count==9){done();clearInterval(count_interval);return}
    q_count++;
    startQuiz();
  })
  $(".wrong").on('click',() => {
    console.log('You clicked on the wrong answer boohoo');
    count-=5;
    $("#countdown").html(count);
  })
}
function startCountdown(){
  count_interval = setInterval(() => {
    $("#countdown").html(count);
    count--;
    if(count<=0){$("#countdown").html("Time's up!");clearInterval(count_interval);done();}

  },1000);
}
function done(){
  let score = 7*count+44*q_count;

  console.log('Your socre is '+score);
  $("#single_match").html('<p class="text-center" style="font-family:Bahiana;color:red;font-size:300%;margin-top:7%;">Well Played!</p><p class="text-center" style="font-size:200%;">Your total score iiiiis</p><p class="text-center" style="font-size:500%;color:blue;font-family:Bahiana">'+score+'</p>');
  $.post('/match')
}
