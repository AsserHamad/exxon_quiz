$(document).ready(function(){
  var glowy = false;
  setInterval(function(){
    console.log("Glowy is "+glowy);
    console.log("Classes: "+$("#logo").attr("class"));
    if(glowy){
      glowy=false;
      $("#logo").addClass("glowing");
    }
    else{
      glowy = true;
      $("#logo").removeClass("glowing");
    }
  },1000);
});
