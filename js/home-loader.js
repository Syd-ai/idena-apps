var lang = localStorage.getItem('lang') || 'en';
var dayl = 'days';
var secl = 'seconds';
var hourl = 'hours';
var minl = 'minutes';
var current = '';
var genesis = 60;
var previous = '';
var epoch = '';
var epochlink = '';
var epoch1 = '';
var growth_last = '--';

function ajax_get(url, callback) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            
            try {
                var data = JSON.parse(xmlhttp.responseText);
            } catch(err) {
                console.log(err.message + " in " + xmlhttp.responseText);
                return;
            }
            callback(data);
        }
    };
 
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}


function precise2(x) {
  return x.toLocaleString(undefined, {maximumFractionDigits:2});
}

function color(x) {
  if(x<0) {
     return '<span class="red">'+x+'% &#x2193;</span>';
  } else {
    return '<span class="green">+'+x+'% &#x2191;</span>';
  }
}


function timemagic(){
  var x = setInterval(function() {

  // Get today's date and time
  var now = new Date().getTime();
    
  // Find the distance between now and the count down date
  var distance = countDownDate - now;
    
  // Time calculations for days, hours, minutes and seconds
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
  // Output the result in an element with id="demo"
  document.getElementById("counter").innerHTML = '<div class="col-auto">'
                    +'<span class="days">'+days+'</span>'
                    +'<span class="_smalltext"> '+dayl+'</span>'
                  +'</div>'
                  +'<div class="col-auto">'
                    +'<span class="hours">'+hours+'</span>'
                    +'<span class="_smalltext"> '+hourl+'</span>'
                  +'</div>'
                  +'<div class="col-auto">'
                    +'<span class="minutes">'+minutes+'</span>'
                    +'<span class="_smalltext"> '+minl+'</span>'
                  +'</div>'
                  +'<div class="col-auto">'
                    +'<span class="seconds">'+seconds+'</span>'
                    +'<span class="_smalltext"> '+secl+'</span>'
                  +'</div>';
  document.getElementById("NextValidationDateTime").innerHTML = validTime;
    
  // If the count down is over, write some text 
  if (distance < 0) {
    clearInterval(x);
    document.getElementById("counter").innerHTML = "EXPIRED";
  }
}, 1000);
}



var onlineid = '<div class="col-12 col-sm-3">'
            +'<h1 id="identities">Identities</h1>'
            +'<div class="card">'
            +'<div class="info_block">'
             +'<div class="row">'
              +'<div class="col-12 col-sm-12 bordered-col">'
                    +'<h3 class="info_block__accent"><span id="OnlineMinersTotal">--</span> / <span id="ValidatedTotal">--</span></h3>'
                    +'<div class="control-label" data-toggle="tooltip" title="" data-original-title="Online miners / Total validated identities" id="online">Online / Total</div>'
                  +'</div>'
              +'</div>'
              +'</div>'
              +'</div></div>';

var growthwidget = '<div class="col-12 col-sm-3">'
            +'<h1 id="network_growth_title">Network Growth</h1>'
            +'<div class="card">'
            +'<div class="info_block">'
             +'<div class="row">'
              +'<div class="col-12 col-sm-12 bordered-col">'
                    +'<div class="col-auto"><h3 class="info_block__accent" id="NetworkGrowth"> '+growth_last+'</h3></div>'
                    +'<div class="control-label" id="since_last_epoch" title="Network growth since last epoch">Growth since last epoch</div>'
              +'</div>'
              +'</div>'
              +'</div>'
              +'</div></div>';


var timewidget = '<div class="row">'
            +onlineid
            +'<div class="col-12 col-sm-6">'
            +'<h1 id="validation_title">Next Validation In</h1>'
            +'<div class="card">'
            +'<div class="info_block">'
            +'<div class="row">'
              +'<div class="col-12 col-sm-12 bordered-col lead_info__counter" id="TimerPanel">'
                +'<div id="counter" class="_value row justify-content-center">'
                  +'<div class="col-auto">'
                    +'<span class="days">--</span>'
                    +'<span class="_smalltext" id="days"> days</span>'
                  +'</div>'
                  +'<div class="col-auto">'
                    +'<span class="hours">--</span>'
                    +'<span class="_smalltext" id="hours"> hours</span>'
                  +'</div>'
                  +'<div class="col-auto">'
                    +'<span class="minutes">--</span>'
                    +'<span class="_smalltext" id="minutes"> min</span>'
                  +'</div>'
                  +'<div class="col-auto">'
                    +'<span class="seconds">--</span>'
                    +'<span class="_smalltext" id="seconds"> seconds</span>'
                  +'</div>'
                +'</div>'
                +'<div class="control-label" data-toggle="tooltip">'
                  +'<span id="validation_sub">Validation time:</span>&nbsp;&nbsp;<span id="NextValidationDateTime">--</span>'
                +'</div>'
              +'</div>'
              +'</div>'
              +'</div>'
              +'</div>'              
              +'</div>'
              +growthwidget
            +'</div>';



window.onload = (function(){

  document.getElementById("time_and_identity").innerHTML = timewidget;

  ajax_get('https://api.idena.io/api/epoch/last', function(data) {
      epochlink = data['result']['epoch'];
      epoch = data['result']['epoch']-2;
      epoch1 = data['result']['epoch'];
      countDownDate = new Date(data['result']['validationTime']).getTime();
      var d = new Date(data['result']['validationTime']);
      validTime = d.toLocaleDateString() + ' ' + d.toLocaleTimeString();
      timemagic();

      ajax_get('https://api.idena.org/api/Epoch/'+epoch1+'/Identities/Count?states[]=Newbie,Verified,Human', function(data) {

          current = data["result"];

          ajax_get('https://api.idena.org/api/Epoch/'+epoch+'/Identities/Count?states[]=Newbie,Verified,Human', function(data) {  

            previous = data["result"];
            growth_last = color(precise2((current-previous)/previous*100));

            document.getElementById("NetworkGrowth").innerHTML = growth_last;

          });

      });

      ajax_get('https://idena-apps.org/locale/'+lang+'.json', function(data2) {

                //load all page lang

                document.getElementById("title").innerHTML = data2["homepage_t"];
                document.getElementById("hero_title").innerHTML = data2["hero_title"];
                document.getElementById("hero_description").innerHTML = data2["hero_description"];
                document.getElementById("contribute").innerHTML = data2["contribute"];
                document.getElementById("submit").innerHTML = data2["submit"];
                document.getElementById("contribute_statement").innerHTML = data2["contribute_statement"];
                document.getElementById("app_all").innerHTML = data2["view_all"];
                document.getElementById("community_all").innerHTML = data2["view_all"];
                document.getElementById("video_all").innerHTML = data2["view_all"];
                document.getElementById("link_all").innerHTML = data2["view_all"];
                document.getElementById("explorer_all").innerHTML = data2["view_all"];

                document.getElementById("apps").innerHTML = data2["apps"];
                document.getElementById("communities").innerHTML = data2["communities"];
                document.getElementById("videos_blogs").innerHTML = data2["videos_blogs"];
                document.getElementById("links").innerHTML = data2["links"];
                document.getElementById("explorers").innerHTML = data2["explorers"];

                document.getElementById("all_categories").innerHTML = data2["all_categories"];
                document.getElementById("identities").innerHTML = data2["identities"];
                document.getElementById("validation_title").innerHTML = data2["validation_title"];
                
                dayl = data2["days"];
                minl = data2["minutes"];
                hourl = data2["hours"];
                secl = data2["seconds"];
                document.getElementById("validation_sub").innerHTML = data2["validation_sub"];
                document.getElementById("online").innerHTML = data2["online_total"];

                document.getElementById("disclaimer").innerHTML = data2["disclaimer"];
                document.getElementById("donation").innerHTML = '<p class="desc" style="line-height: 2em;">'+data2["donate_pretext"] 
                +'<a href="http://github.com/bingbinglee/" target="_blank">@bingbinglee.</a>'+data2["donate_posttext"]+'<a href="https://scan.idena.io/address?address=0x140d5add76f3e4cc4538b9809601383bd74689df" target="_blank">'
                +'<span class="donate">0x140d5add76f3e4cc4538b9809601383bd74689df</span></a></p>';

                //page lang load ends

      });


  });

  ajax_get('https://api.idena.org/api/OnlineIdentities/Count', function(data) {
      var countnum = precise2(data['result']);
      document.getElementById("ValidatedTotal").innerHTML = countnum;
  });


  ajax_get('https://api.idena.org/api/OnlineMiners/Count', function(data) {
      var countnum = precise2(data['result']);
      document.getElementById("OnlineMinersTotal").innerHTML = countnum;
  });





})();
