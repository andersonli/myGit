"use strict";
alert("aa");
if (window.XMLHttpRequest)
{// code for IE7+, Firefox, Chrome, Opera, Safari
xmlhttp=new XMLHttpRequest();
}
else
{// code for IE6, IE5
xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
}
xmlhttp.open("GET","pc.xml",false);
xmlhttp.send();
xmlDoc=xmlhttp.responseXML;

document.getElementById("Brand").innerHTML=
xmlDoc.getElementsByTagName("Brand")[0].childNodes[0].nodeValue;
document.getElementById("Style").innerHTML=
xmlDoc.getElementsByTagName("Style")[0].childNodes[0].nodeValue;
document.getElementById("Cpu").innerHTML=
xmlDoc.getElementsByTagName("Cpu")[0].childNodes[0].nodeValue;
document.getElementById("Gpu").innerHTML=
xmlDoc.getElementsByTagName("Gpu")[0].childNodes[0].nodeValue;
document.getElementById("HardDisk").innerHTML=
xmlDoc.getElementsByTagName("HardDisk")[0].childNodes[0].nodeValue;

