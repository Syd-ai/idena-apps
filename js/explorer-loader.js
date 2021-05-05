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


var exlist = document.getElementById("explorer-list");
var excontent = '';
var official = '';
var git = '';
var caption = '';

window.onload = (function(){


//load all explorers
  ajax_get('https://idena-apps.com/source/explorer', function(data) {
    //console.log(data);


    ajax_get('https://idena-apps.org/locale/'+lang+'.json', function(data2) {

                //load all page lang

                document.getElementById("title").innerHTML = data2["explorers_t"];
                document.getElementById("back").innerHTML = data2["back"];
                document.getElementById("page-title").innerHTML = data2["all"]+' '+data2["explorers"]+' ('+data["entries"].length+')';
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
                    if(obj.github!=""){
                        git = '<a class="btn btn-secondary btn-small" href="'+obj.github+'" target="_blank">'
                                        +'<span>'+data2["github"]+'</span>'
                                        +'<i class="icon icon--thin_arrow_right"></i>'
                                      +'</a>';
                    } else { git = '<a class="btn btn-secondary btn-small" href="'+obj.github+'" disabled>'
                            +'<span>'+data2["github"]+'</span>'
                            +'<i class="icon icon--thin_arrow_right"></i>'
                          +'</a>'; }
                    excontent = excontent + '<div class="col-12 col-sm-3 entry">'
                                      +'<div class="mini-card">'
                                      +'<a href="'+obj.url+'" target="_blank"><div class="thumbnail" style="background-image: url('+obj.image_url+');">'+official+'</div></a>'
                                      +'<p class="desc" style="padding-bottom: 0px;">'
                                       +obj.short_description
                                      +'</p>'
                                      +'<p class="control">'+data2["by"]+' '+obj.created_by+'</p>'
                                      +'<a class="btn btn-secondary btn-small" href="'+obj.url+'" target="_blank">'
                                        +'<span>'+data2["visit"]+'</span>'
                                        +'<i class="icon icon--thin_arrow_right"></i>'
                                      +'</a>'
                                      +git
                                      +'</div>'
                                    +'</div>'; 
                });

                exlist.innerHTML = excontent;


         });
      
  }); //fetching all the communities listed




})();
