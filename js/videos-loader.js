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


var videolist = document.getElementById("videos-list");
var videocontent = '';
var official = '';
var git = '';
var caption = '';
var play = '';


window.onload = (function(){


  //load all videos
  ajax_get('https://idena-apps.org/sources/videos.json', function(data) {
    //console.log(data);

    data["entries"].forEach(function(obj) { 

    	if(obj.official=="no") {
    		//console.log(obj.official);
    		official = '<span class="badge badge-secondary hide">Official</span>';
    	} else {
    		official = '<span class="badge badge-secondary">Official</span>';
    	}
      if(obj.type=="video") {
        caption = 'Watch Video';
        play = '<img src="./images/play.svg" width="36px" height="36px" style="opacity: 1;position: absolute;top: 23%;left: 43%;right: 0;bottom: 0;">';
      } else {
        caption = 'Read Post';
        play = '';
      }
    	videocontent = videocontent + '<div class="col-12 col-sm-3 entry">'
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



})();