"use strict";function findRandom(){var r=1,t=[];for(r=1;r<blockArr.length;r++)5===blockArr[r]&&t.push(r);var o=t[~~(Math.random()*(t.length-1)+1)];return o}function next(){function r(r){for(var t=0;t<r.length;t++){if(0===r[t])return gameResult("O win!"),!0;if(3===r[t])return gameResult("X win!"),!0}return!1}var t=new Array(3),o=new Array(3),e=new Array(3);item^=1,count+=1,t[0]=blockArr[1]+blockArr[2]+blockArr[3],t[1]=blockArr[4]+blockArr[5]+blockArr[6],t[2]=blockArr[7]+blockArr[8]+blockArr[9],o[0]=blockArr[1]+blockArr[4]+blockArr[7],o[1]=blockArr[2]+blockArr[5]+blockArr[8],o[2]=blockArr[3]+blockArr[6]+blockArr[9],e[0]=blockArr[1]+blockArr[5]+blockArr[9],e[1]=blockArr[3]+blockArr[5]+blockArr[7],r(t)?console.log("restart"):r(o)?console.log("restart"):r(e)?console.log("restart"):9===count?(gameResult("Tie!"),console.log("restart")):computer.term&&computer.run()}function init(){$("#b1").css({"border-top":"none"}).css({"border-left":"none"}),$("#b2").css({"border-top":"none"}),$("#b3").css({"border-top":"none"}).css({"border-right":"none"}),$("#b4").css({"border-left":"none"}),$("#b6").css({"border-right":"none"}),$("#b7").css({"border-bottom":"none"}).css({"border-left":"none"}),$("#b8").css({"border-bottom":"none"}),$("#b9").css({"border-bottom":"none"}).css({"border-right":"none"}),$("#b1").click(function(){computer.term=!0,chooseB(1)}),$("#b2").click(function(){computer.term=!0,chooseB(2)}),$("#b3").click(function(){computer.term=!0,chooseB(3)}),$("#b4").click(function(){computer.term=!0,chooseB(4)}),$("#b5").click(function(){computer.term=!0,chooseB(5)}),$("#b6").click(function(){computer.term=!0,chooseB(6)}),$("#b7").click(function(){computer.term=!0,chooseB(7)}),$("#b8").click(function(){computer.term=!0,chooseB(8)}),$("#b9").click(function(){computer.term=!0,chooseB(9)}),$("#newGame").click(restart),$("#setO").click(function(){initialItem=0,item=0}),$("#setX").click(function(){initialItem=1,item=1}),$("#result-confrim").click(restart),$("#myModal").modal("show")}function chooseB(r){var t="#b"+r;5===blockArr[r]&&($(t).append(itemArr[item]),blockArr[r]=item,next())}function restart(){for($("#b1").html(""),$("#b2").html(""),$("#b3").html(""),$("#b4").html(""),$("#b5").html(""),$("#b6").html(""),$("#b7").html(""),$("#b8").html(""),$("#b9").html(""),i=blockArr.length;i--;)blockArr[i]=5;count=0,item=initialItem}function gameResult(r){$("#resultLabel").html(r),$("#result").modal("show")}var itemArr=['<i class="fa fa-circle-o centerlize" style="font-size:7vw" aria-hidden="true"></i>','<i class="fa fa-times-circle fa-5x centerlize" style="font-size:7vw" aria-hidden="true"></i>'],initialItem=0,item=0,count=0,blockArr=new Array(10),i,computer={};restart(),computer.init=function(){this.mode="master",this.term=!1,this.winList=new Array(8),this.winList[0]=[1,2,3],this.winList[1]=[4,5,6],this.winList[2]=[7,8,9],this.winList[3]=[1,4,7],this.winList[4]=[2,5,8],this.winList[5]=[3,6,9],this.winList[6]=[1,5,9],this.winList[7]=[3,5,7]},computer.init(),computer.findChance=function(r){var t,o=0,e=[],n=0,i=[];for(o=1;o<blockArr.length;o++)blockArr[o]==r&&e.push(o);for(o=0;o<this.winList.length;o++)t=0,n=0,this.winList[o].forEach(function(r){e.indexOf(r)!==-1?t++:n=r}),2===t&&0!==n&&i.push(n);if(0===i.length)return-1;for(o=0;o<i.length;o++)if(5===blockArr[i[o]])return i[o];return-1},computer.findDanger=function(r){var t,o=[],e=-1,n=[],i=0;do e=blockArr.indexOf(r,e+1),e!=-1&&o.push(e);while(e!=-1);var c=this.winList;for(e=0;e<c.length;e++)t=0,i=0,c[e].forEach(function(r){o.indexOf(r)!=-1?t++:i=r}),2===t&&0!==i&&n.push([e,i]);if(0===n.length)return-1;for(e=0;e<n.length;e++)if(5===blockArr[n[e][1]])return n[e][1];return-1},computer.run=function(){computer.term=!1;var r=item,t=1^item,o=this.findDanger(t),e=this.findChance(r);5===blockArr[5]?chooseB(5):"chlid"===this.mode?chooseB(findRandom()):"normal"===this.mode?chooseB(o!=-1?o:findRandom()):"master"===this.mode&&chooseB(e!=-1?e:o!=-1?o:findRandom())};