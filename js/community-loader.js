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


var comlist = document.getElementById("communities-list");
var comcontent = '';
var official = '';
var git = '';
var caption = '';


window.onload = (function(){


//load all communities
  ajax_get('https://idena-apps.org/sources/communities.json', function(data) {
    //console.log(data);

    ajax_get('https://idena-apps.org/locale/'+lang+'.json', function(data2) {

                //load all page lang
                document.getElementById("back").innerHTML = data2["back"];
                document.getElementById("page-title").innerHTML = data2["all"]+' '+data2["communities"];
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
                	comcontent = comcontent + '<div class="col-12 col-sm-3 entry">'
                              +'<div class="mini-card">'
                                +'<center>'
                                +'<a href="'+obj.url+'" target="_blank"><div class="user-pic"><img src="'+obj.image_url+'" width="80"></div></a>'
                                +'<p class="desc">'
                                +obj.short_description
                                        +official
                                +'</p>'                  
                                +'<a class="btn btn-secondary btn-small" href="'+obj.url+'" target="_blank">'
                                  +'<span>'+data2["join_community"]+'</span>'
                                  +'<i class="icon icon--thin_arrow_right"></i>'
                                +'</a>'
                                +'</center>'
                              +'</div>'
                            +'</div>'; 
                });

                comlist.innerHTML = comcontent;
                  
              }); //fetching all the communities listed

    });



})();