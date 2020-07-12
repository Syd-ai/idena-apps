var lang = localStorage.getItem('lang') || 'en';
var pgtitle = '';

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


//toggles for only showing videos
function showVideo()
{
    var allblogs = document.getElementsByClassName("blog"); 
    var allvideos = document.getElementsByClassName("video"); 

    for (var i = 0; i < allblogs.length; i++) {
            allblogs[i].classList.add('rem');
            // alert("add blog hide!");
    }
    for (var i = 0; i < allvideos.length; i++) {
        if (allvideos[i].classList.contains('rem')) {
            allvideos[i].classList.remove('rem');
            // alert("remove video hide!");
        }
    }

    document.getElementById("page-title").innerHTML = pgtitle+' ('+allvideos.length+')';

    document.getElementById('all-tab').classList.remove('activetab');
    document.getElementById('all-vid-tab').classList.add('activetab');
    document.getElementById('all-blog-tab').classList.remove('activetab');

}


//toggles for only showing blogs
function showBlog()
{
    var allblogs = document.getElementsByClassName("blog"); 
    var allvideos = document.getElementsByClassName("video"); 

    for (var i = 0; i < allvideos.length; i++) {
            allvideos[i].classList.add('rem');
            // alert("add video hide!");
    }
    for (var i = 0; i < allblogs.length; i++) {
        if (allblogs[i].classList.contains('rem')) {
            allblogs[i].classList.remove('rem');
            // alert("remove blog hide!");
        }
    }
    document.getElementById("page-title").innerHTML = pgtitle+' ('+allblogs.length+')';


    document.getElementById('all-tab').classList.remove('activetab');
    document.getElementById('all-vid-tab').classList.remove('activetab');
    document.getElementById('all-blog-tab').classList.add('activetab');

}


function showAll()
{
    document.getElementById('all-tab').classList.add('activetab');
    document.getElementById('all-vid-tab').classList.remove('activetab');
    document.getElementById('all-blog-tab').classList.remove('activetab');

    var allentries = document.getElementsByClassName("entry"); 
    document.getElementById("page-title").innerHTML = pgtitle+' ('+allentries.length+')';

    for (var i = 0; i < allentries.length; i++) {
            allentries[i].classList.remove('rem');
    }
}




var videolist = document.getElementById("videos-list");
var videocontent = '';
var official = '';
var git = '';
var caption = '';
var play = '';


window.onload = (function(){


  //load all videos
  ajax_get('https://idena-dev.com/source/videos', function(data) {
    //console.log(data);

        ajax_get('https://idena-apps.org/locale/'+lang+'.json', function(data2) {

                //load all page lang

                document.getElementById("back").innerHTML = data2["back"];
                document.getElementById("title").innerHTML = data2["videos_t"];
                document.getElementById("all-tab").innerHTML = data2["all"];
                document.getElementById("all-vid-tab").innerHTML = data2["videos"];
                document.getElementById("all-blog-tab").innerHTML = data2["blogs"];

                pgtitle = data2["all"]+' '+data2["videos_blogs"];
                document.getElementById("page-title").innerHTML = pgtitle+' ('+data["entries"].length+')';

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
                  if(obj.type=="video") {
                    caption = data2["watch"];
                    play = '<img src="./images/play.svg" width="36px" height="36px" style="opacity: 1;position: absolute;top: 23%;left: 43%;right: 0;bottom: 0;">';
                  } else {
                    caption = data2["read"];
                    play = '';
                  }
                	videocontent = videocontent + '<div class="col-12 col-sm-3 entry '+obj.type+'">'
                                      +'<div class="mini-card">'
                                      +'<a href="'+obj.url+'" target="_blank"><div class="thumbnail" style="background-image: url('+obj.image_url+');">'+official+play+'</div></a>'
                                      +'<p class="desc" style="padding-bottom: 0px;">'
                                       +obj.short_description                          
                                      +'</p>'
                                      +'<p class="control">By '+obj.created_by+'</p>'
                                      +'<a class="btn btn-secondary btn-small" href="'+obj.url+'" target="_blank">'
                                        +'<span>'+caption+'</span>'
                                        +'<i class="icon icon--thin_arrow_right"></i>'
                                      +'</a>'
                                      +'</div>'
                                    +'</div>'; 
                });

                videolist.innerHTML = videocontent;
                  
              }); //fetching all the videos listed


      });



})();