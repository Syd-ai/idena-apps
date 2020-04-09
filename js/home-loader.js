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
var comlist = document.getElementById("communities-list");
var exlist = document.getElementById("explorer-list");
var comcontent = '';
var videocontent = '';
var excontent = '';
var official = '';
var git = '';


window.onload = (function(){

  //load all videos
  ajax_get('http://idena-apps.org/sources/videos.json', function(data) {
    //console.log(data);

    data["entries"].forEach(function(obj) { 

    	if(obj.official=="no") {
    		console.log(obj.official);
    		official = '<span class="badge badge-secondary hide">Official</span>';
    	} else {
    		official = '<span class="badge badge-secondary">Official</span>';
    	}
    	videocontent = videocontent + '<div class="col-12 col-sm-3 entry">'
                          +'<div class="mini-card">'
                          +'<div class="thumbnail" style="background-image: url('+obj.image_url+');"></div>'
                          +'<p class="desc">'
                           +obj.short_description
                            +official
                          +'</p>'
                          +'<a class="btn btn-secondary btn-small" href="'+obj.url+'" target="_blank">'
                            +'<span>Watch Video</span>'
                            +'<i class="icon icon--thin_arrow_right"></i>'
                          +'</a>'
                          +'</div>'
                        +'</div>'; 
    });

    videolist.innerHTML = videocontent;
      
  }); //fetching all the videos listed





//load all communities
  ajax_get('http://idena-apps.org/sources/communities.json', function(data) {
    //console.log(data);

    data["entries"].forEach(function(obj) { 

    	if(obj.official=="no") {
    		console.log(obj.official);
    		official = '<span class="badge badge-secondary hide">Official</span>';
    	} else {
    		official = '<span class="badge badge-secondary">Official</span>';
    	}
    	comcontent = comcontent + '<div class="col-12 col-sm-3 entry">'
                  +'<div class="mini-card">'
                    +'<center>'
                    +'<div class="user-pic"><img src="'+obj.image_url+'" width="80"></div>'
                    +'<p class="desc">'
                    +obj.short_description
                            +official
                    +'</p>'
                    +'<a class="btn btn-secondary btn-small" href="'+obj.url+'" target="_blank">'
                      +'<span>Join Community</span>'
                      +'<i class="icon icon--thin_arrow_right"></i>'
                    +'</a>'
                    +'</center>'
                  +'</div>'
                +'</div>'; 
    });

    comlist.innerHTML = comcontent;
      
  }); //fetching all the communities listed





//load all explorers
  ajax_get('http://idena-apps.org/sources/explorer.json', function(data) {
    //console.log(data);

    data["entries"].forEach(function(obj) { 

    	if(obj.official=="no") {
    		console.log(obj.official);
    		official = '<span class="badge badge-secondary hide">Official</span>';
    	} else {
    		official = '<span class="badge badge-secondary">Official</span>';
    	}
    	if(obj.github!=""){
    		git = '<a class="btn btn-secondary btn-small" href="'+obj.github+'" target="_blank">'
                            +'<span>Github Project Page</span>'
                            +'<i class="icon icon--thin_arrow_right"></i>'
                          +'</a>';
    	} else { git = ''; }
    	excontent = excontent + '<div class="col-12 col-sm-3 entry">'
                          +'<div class="mini-card">'
                          +'<div class="thumbnail" style="background-image: url('+obj.image_url+');"></div>'
                          +'<p class="desc">'
                           +obj.short_description
                            +official
                          +'</p>'
                          +'<a class="btn btn-secondary btn-small" href="'+obj.url+'" target="_blank">'
                            +'<span>Visit Website</span>'
                            +'<i class="icon icon--thin_arrow_right"></i>'
                          +'</a>'
                          +git
                          +'</div>'
                        +'</div>'; 
    });

    exlist.innerHTML = excontent;
      
  }); //fetching all the communities listed




})();