
$(document).ready(function(){
  var glowy = false;
  setInterval(function(){
    console.log("Glowy is "+glowy);
    if(glowy){
      glowy=false;
      $("#logo").addClass("glowy");
    }
    else{
      glowy = true;
      $("#logo").removeClass("glowy");
    }
  },3000);
});
