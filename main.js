$(document).ready(function() {

  reset();
});

var bef;
var af;
var operator;
var needToErase = false;
var lastCallisNumber;
var bothErase;
var showResultBelow = true;
var fp;
var lastCallisCE;

function number(value){
  //Do nothing on conditions below
  if(($("#result h1").text() == "0" && value == "0")) return;
  if(fp == true && value == ".") return;

  if(($("#result h1").text() == "0" && value != "0" && value != ".")){
    needToErase = true;
    bothErase = true;
  }

  if(needToErase) {
    $("#result h1").empty();;
    needToErase = false;
    if(bothErase){
      $(" #result p").empty();
      bothErase = false;
    }
  }
  if(value == "." ) {
    fp = true;
  }
  $("#result h1, #result p").append(value);
  lastCallisNumber = true;

}



function process(op){
  if(lastCallisNumber){

    if(bef== undefined ){

      bef = parseFloat($("#result h1").text());
      operator = op;
      fp = false;
      $("#result h1").empty();
      $("#result h1").append(op);
      $("#result p").append(" " + op + " ");

    }else{
      showResultBelow = false;
      bef = equ();
      showResultBelow = true;
      $("#result p").append(" "+ op + " ");
      operator = op;
      bothErase = false;

    }

    lastCallisNumber = false;
    needToErase = true;

  }else if(lastCallisCE){
     operator = op;
     $("#result h1, #result p").append(op);
     lastCallisCE = false;

  }



}

function equ(){
  console.log("at equ");
  if(lastCallisNumber){
    var ans;
    af = parseFloat($("#result h1").text());
    if(operator == "+") ans = bef + af;
    if(operator == "-") ans = bef - af;
    if(operator == "*") ans = bef * af;
    if(operator == "/") ans = bef / af;
    $("#result h1").empty();
    $("#result h1").append(ans);
    if(showResultBelow == true){
      $("#result p").append(" = " + ans);
    }
    bef = undefined;
    af = undefined;
    operator = undefined;
    needToErase = true;
    bothErase = true;
    fp = false;
    lastCallisNumber = false;
    return ans;
  }
}

function clearEntry(){
  if(lastCallisNumber){

    if(bef == undefined) {
        reset();
    }else{
        var temp = $("#result h1").text();
        temp = new RegExp(temp + "$");
        $("#result h1").empty();
        var text = $("#result p").text();
        text = text.replace(temp, "");
        $("#result p").text(text);
        fp = false;
        //console.log(temp);
      }
  }else{
      if(bef == undefined) {
        reset();
      }else{
        var temp = new RegExp("\\" + operator + "\\s" + "$");
        console.log(temp);
        var text = $("#result p").text();
        text = text.replace(temp, "");
        console.log(text);
        $("#result p").text(text);
        $("#result h1").empty();
        lastCallisCE = true;
        return;

      }
  }
  lastCallisNumber = false;
}


function reset(){
  $("#result h1, #result p").empty();
  $("#result h1, #result p").append("0");
  bef = undefined;
  af = undefined;
  operator = undefined;
  fp = false;
  lastCallisNumber = false;
}
