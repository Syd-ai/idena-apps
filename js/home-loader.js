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
var appslist = document.getElementById("apps-list");
var linkslist = document.getElementById("links-list");
var comcontent = '';
var videocontent = '';
var excontent = '';
var appscontent = '';
var linkscontent = '';
var official = '';
var git = '';
var caption = '';
var play = '';


window.onload = (function(){


  //load all apps
  ajax_get('https://idena-apps.org/sources/apps.json', function(data) {
    //console.log(data);

    data["entries"].forEach(function(obj) { 

      if(obj.official=="no") {
        //console.log(obj.official);
        official = '<span class="badge badge-secondary hide">Official</span>';
      } else {
        official = '<span class="badge badge-secondary">Official</span>';
      }
      if(obj.github!=""){
        git = '<a class="btn btn-secondary btn-small" href="'+obj.github+'" target="_blank">'
                            +'<span>Github Project Page</span>'
                            +'<i class="icon icon--thin_arrow_right"></i>'
                          +'</a>';
      } else { git = '<a class="btn btn-secondary btn-small" href="'+obj.github+'" disabled>'
                            +'<span>Github Unavailable</span>'
                            +'<i class="icon icon--thin_arrow_right"></i>'
                          +'</a>'; }
      appscontent = appscontent + '<div class="col-12 col-sm-3 entry">'
                          +'<div class="mini-card">'
                          +'<a href="'+obj.url+'" target="_blank"><div class="thumbnail" style="background-image: url('+obj.image_url+');">'+official+'</div></a>'
                          +'<p class="desc" style="padding-bottom: 0px;">'
                           +obj.short_description
                          +'</p>'
                          +'<p class="control">By '+obj.created_by+'</p>'
                          +'<a class="btn btn-secondary btn-small" href="'+obj.url+'" target="_blank">'
                            +'<span>App Details</span>'
                            +'<i class="icon icon--thin_arrow_right"></i>'
                          +'</a>'
                          +git
                          +'</div>'
                        +'</div>'; 
    });

    appslist.innerHTML = appscontent;
      
  }); //fetching all the apps listed




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





//load all communities
  ajax_get('https://idena-apps.org/sources/communities.json', function(data) {
    //console.log(data);

    data["entries"].forEach(function(obj) { 

    	if(obj.official=="no") {
    		//console.log(obj.official);
    		official = '<span class="badge badge-secondary hide">Official</span>';
    	} else {
    		official = '<span class="badge badge-secondary">Official</span>';
    	}
    	comcontent = comcontent + '<div class="col-12 col-sm-3 entry">'
                  +'<div class="mini-card">'
                    +'<center>'
                    +'<a href="'+obj.url+'" target="_blank"><div class="user-pic"><img src="'+obj.image_url+'" width="80"></div></a>'
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





  //load all links
  ajax_get('https://idena-apps.org/sources/links.json', function(data) {
    //console.log(data);

    data["entries"].forEach(function(obj) { 

      if(obj.official=="no") {
        //console.log(obj.official);
        official = '<span class="badge badge-secondary hide">Official</span>';
      } else {
        official = '<span class="badge badge-secondary">Official</span>';
      }
      linkscontent = linkscontent + '<div class="col-12 col-sm-3 entry">'
                  +'<div class="mini-card">'
                    +'<center>'
                    +'<a href="'+obj.url+'" target="_blank"><div class="user-pic"><img src="'+obj.image_url+'" width="80"></div></a>'
                    +'<p class="desc">'
                    +obj.short_description
                            +official
                    +'</p>'                  
                    +'<a class="btn btn-secondary btn-small" href="'+obj.url+'" target="_blank">'
                      +'<span>Visit Site</span>'
                      +'<i class="icon icon--thin_arrow_right"></i>'
                    +'</a>'
                    +'</center>'
                  +'</div>'
                +'</div>'; 
    });

    linkslist.innerHTML = linkscontent;
      
  }); //fetching all the links listed





//load all explorers
  ajax_get('https://idena-apps.org/sources/explorer.json', function(data) {
    //console.log(data);

    data["entries"].forEach(function(obj) { 

    	if(obj.official=="no") {
    		//console.log(obj.official);
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
                          +'<a href="'+obj.url+'" target="_blank"><div class="thumbnail" style="background-image: url('+obj.image_url+');">'+official+'</div></a>'
                          +'<p class="desc" style="padding-bottom: 0px;">'
                           +obj.short_description
                          +'</p>'
                          +'<p class="control">By '+obj.created_by+'</p>'
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