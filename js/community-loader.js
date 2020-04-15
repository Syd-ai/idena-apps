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


var comlist = document.getElementById("communities-list");
var comcontent = '';
var official = '';
var git = '';
var caption = '';


window.onload = (function(){


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



})();