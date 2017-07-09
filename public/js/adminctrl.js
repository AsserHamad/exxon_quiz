$("document").ready(function(){

  $("#q_submit").on('click',function(){
    function shuffle(a) {
      var j, x, i;
      for (i = a.length; i; i--) {
          j = Math.floor(Math.random() * i);
          x = a[i - 1];
          a[i - 1] = a[j];
          a[j] = x;
      }
      return a;
    }
    let arr = shuffle([$("#choice_1").val(),$("#choice_2").val(),$("#choice_3").val(),$("#choice_4").val()]);
    alert("Your shuffled array is "+arr);
    let query = {text:$("#quest").val(), correctAnswer:$("#choice_1").val(), choice1:arr[0], choice2:arr[1], choice3:arr[2], choice4:arr[3]};
    $.post('/questions',query)
    .done(function(res){
      alert('Question submitted successfully!')
    })
  });

  function refreshCandidates(){
    $.get('/users/unaccepted')
    .done(function(res){
      for(var i = 0;i<res.length;i++){
        $("#accepting_div").html($("#accepting_div").html()+
          '<div id="accept_'+i+'" class="col-xs-12 acc text-center">'+res[i].fullName+'<br>'+res[i].email+'<br>'+"Applying as: "+res[i].role+'</div>'
        )
        makeDivDoStuff(i,res[i].id);
    }
  })
  function makeDivDoStuff(num, id){
    console.log("Making accept no."+num);
    $("#accept_"+num).click(function(){
      console.log("YOU CLICKED DIV NUMBER "+num);
      $.get('/users/'+id+'/accept')
      .done(function(){
        refreshCandidates();
        alert(id+" has been accepted!!!")
      })
    })
  }
  }
  refreshCandidates();
})
