// ==UserScript==
// @name        steampowered.ris
// @namespace   space.evolving
// @include     http://store.steampowered.com/app/*
// @version     1
// @grant       none
// ==/UserScript==

var sitePrefix = "http://store.steampowered.com/app/";

function getPosition(string, subString, index) {
   return string.split(subString, index).join(subString).length;
}

var ris = "TY - COMP";
var title = document.getElementsByClassName("apphub_AppName")[0].innerText.replace(/(\r\n|\n|\r)/gm," ");
ris += "\nTI - " + title;
var rightCol = document.getElementsByClassName("rightcol")[0];
var description = rightCol.getElementsByClassName("game_description_snippet")[0].innerText.replace(/(\r\n|\n|\r)/gm," ");
ris += "\nAB - " + description;
var releaseDate = rightCol.getElementsByClassName("release_date")[0].getElementsByClassName("date")[0].innerText;
ris += "\nDA - " + releaseDate;
var url = location.href;

if (url.indexOf("?")>-1){
  url = url.substr(0,url.indexOf("?"));
}
ris += "\nUR - " + url;
var devRows = rightCol.getElementsByClassName("dev_row");
for(var i = 0; i < devRows.length; i++) {
  var devRow = devRows[i];
  var devType = devRow.getElementsByClassName("subtitle")[0].innerText.toUpperCase();
  var devData = devRow.getElementsByClassName("summary")[0].innerText;
  if(devType.indexOf("PUBLISHER") !== -1) {
    ris += "\nPB - " + devData;
  } else if(devType.indexOf("DEVELOPER") !== -1) {
    var devs = devData.split(",");
    for(var j = 0; j < devs.length; j++) {
      ris += "\nA1 - " + devs[j].trim();
    }
  }
}
var id = url.substr(sitePrefix.length);
id = id.substr(0,getPosition(id, "/", 2)).replace(/(\/)/gm,"_");
ris += "\nID - " + id;

var about = document.getElementById("game_area_description").innerHTML.replace(/(\r\n|\n|\r)/gm," ");
ris += "\nN1 - " + about;

var currDate = new Date();
ris += "\nY2 - " + currDate;

var a = document.createElement('a');
a.href = 'data:application/ris;charset=utf-8,' + encodeURIComponent(ris);
a.download = id + ".ris";
a.className = 'btnv6_blue_hoverfade btn_medium';
var span = document.createElement('span');
span.textContent = 'Export Citation (RIS)';
a.appendChild(span);
document.getElementsByClassName('apphub_OtherSiteInfo')[0].appendChild(a);
