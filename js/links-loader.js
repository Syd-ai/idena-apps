var lang = localStorage.getItem('lang') || 'en';

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


var linkslist = document.getElementById("links-list");
var linkscontent = '';
var official = '';
var git = '';
var caption = '';
var pgtitle = '';


// show all entries

function showAll()
{

    document.getElementById('all-tab').classList.add('activetab');
    document.getElementById('coin_stats').classList.remove('activetab');
    document.getElementById('exchange').classList.remove('activetab');
    document.getElementById('other').classList.remove('activetab');


    var allentries = document.getElementsByClassName("entry"); 
    document.getElementById("page-title").innerHTML = pgtitle+' ('+allentries.length+')';

    for (var i = 0; i < allentries.length; i++) {
            allentries[i].classList.remove('rem');
    }
}



//toggles for only showing exchanges
function showEx()
{
    var ex = document.getElementsByClassName("exchange"); 
    var allentries = document.getElementsByClassName("entry"); 

    for (var i = 0; i < allentries.length; i++) {
            allentries[i].classList.add('rem');
    }
    for (var i = 0; i < ex.length; i++) {
        if (ex[i].classList.contains('rem')) {
            ex[i].classList.remove('rem');
        }
    }

    document.getElementById("page-title").innerHTML = pgtitle+' ('+ex.length+')';

    document.getElementById('all-tab').classList.remove('activetab');
    document.getElementById('coin_stats').classList.remove('activetab');
    document.getElementById('exchange').classList.add('activetab');
    document.getElementById('other').classList.remove('activetab');

}




//toggles for only showing coin stats
function showCoin()
{
    var stats = document.getElementsByClassName("coin_stats"); 
    var allentries = document.getElementsByClassName("entry"); 

    for (var i = 0; i < allentries.length; i++) {
            allentries[i].classList.add('rem');
    }
    for (var i = 0; i < stats.length; i++) {
        if (stats[i].classList.contains('rem')) {
            stats[i].classList.remove('rem');
        }
    }

    document.getElementById("page-title").innerHTML = pgtitle+' ('+stats.length+')';

    document.getElementById('all-tab').classList.remove('activetab');
    document.getElementById('coin_stats').classList.add('activetab');
    document.getElementById('exchange').classList.remove('activetab');
    document.getElementById('other').classList.remove('activetab');

}



//toggles for only showing others
function showOther()
{
    var other = document.getElementsByClassName("other"); 
    var allentries = document.getElementsByClassName("entry"); 

    for (var i = 0; i < allentries.length; i++) {
            allentries[i].classList.add('rem');
    }
    for (var i = 0; i < other.length; i++) {
        if (other[i].classList.contains('rem')) {
            other[i].classList.remove('rem');
        }
    }

    document.getElementById("page-title").innerHTML = pgtitle+' ('+other.length+')';

    document.getElementById('all-tab').classList.remove('activetab');
    document.getElementById('coin_stats').classList.remove('activetab');
    document.getElementById('exchange').classList.remove('activetab');
    document.getElementById('other').classList.add('activetab');

}



window.onload = (function(){


  //load all links
  ajax_get('https://idena-apps.com/source/links', function(data) {
    //console.log(data);

     ajax_get('https://idena-apps.org/locale/'+lang+'.json', function(data2) {

                //load all page lang
                document.getElementById("back").innerHTML = data2["back"];
                document.getElementById("title").innerHTML = data2["links_t"];
                pgtitle = data2["all"]+' '+data2["links"];
                document.getElementById("page-title").innerHTML = pgtitle+' ('+data["entries"].length+')';

                document.getElementById("all-tab").innerHTML = data2["all"];
                document.getElementById("exchange").innerHTML = data2["exchange"];
                document.getElementById("coin_stats").innerHTML = data2["coin_stats"];
                document.getElementById("other").innerHTML = data2["other"];

                document.getElementById("disclaimer").innerHTML = data2["disclaimer"];
                document.getElementById("donation").innerHTML = '<p class="desc" style="line-height: 2em;">'+data2["donate_pretext"] 
                +'<a href="http://github.com/bingbinglee/" target="_blank">@bingbinglee.</a>'+data2["donate_posttext"]+'<a href="https://scan.idena.io/address?address=0x140d5add76f3e4cc4538b9809601383bd74689df" target="_blank">'
                +'<span class="donate">0x140d5add76f3e4cc4538b9809601383bd74689df</span></a></p>';

                //page lang load ends

                data["entries"].forEach(function(obj) { 

                  if(obj.official=="no") {
                    //console.log(obj.official);
                    official = '<span class="badge badge-secondary hide">'+data2["official"]+'</span>';
                  } else {
                    official = '<span class="badge badge-secondary">'+data2["official"]+'</span>';
                  }
                  linkscontent = linkscontent + '<div class="col-12 col-sm-4 entry '+obj.category+'">'
                              +'<div class="mini-card">'
                                +'<center>'
                                +'<a href="'+obj.url+'" target="_blank"><div class="user-pic"><img src="'+obj.image_url+'" width="80"></div></a>'
                                +'<p class="desc">'
                                +obj.short_description
                                        +official
                                +'</p>'                  
                                +'<a class="btn btn-secondary btn-small" href="'+obj.url+'" target="_blank">'
                                  +'<span>'+data2["visit"]+'</span>'
                                  +'<i class="icon icon--thin_arrow_right"></i>'
                                +'</a>'
                                +'</center>'
                              +'</div>'
                            +'</div>'; 
                });

                linkslist.innerHTML = linkscontent;

        });
      
  }); //fetching all the links listed



})();
