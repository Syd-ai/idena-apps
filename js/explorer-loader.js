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


var exlist = document.getElementById("explorer-list");
var excontent = '';
var official = '';
var git = '';
var caption = '';

window.onload = (function(){


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