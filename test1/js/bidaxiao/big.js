'use strict';
var a = parseInt(document.getElementById('a1').value);
var b = parseInt(document.getElementById('a2').value);
var c = parseInt(document.getElementById('a3').value);
var tmp;
alert(a);
alert("wowo");
if(a>b){
	tmp=a;
	a=b;
	b=tmp;
}
if(b>c){
	tmp=b;
	b=c;
	c=tmp;
}
if(a>b){
	alert(c>a>b);
}else{
	alert(c>b>a);
}
var txt=a1 + "&nbsp;&nbsp;&nbsp;"+ a2 + "&nbsp;&nbsp;&nbsp;"+ a3;

