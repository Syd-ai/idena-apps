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


function showAll()
{
    document.getElementById('all-tab').classList.add('activetab');
    document.getElementById('all-app-tab').classList.remove('activetab');
    document.getElementById('all-bot-tab').classList.remove('activetab');
    document.getElementById('all-wallet-tab').classList.remove('activetab');
    document.getElementById('all-others-tab').classList.remove('activetab');
    document.getElementById('all-mgr-tab').classList.remove('activetab');
    document.getElementById('all-analytics-tab').classList.remove('activetab');
    document.getElementById('all-lib-tab').classList.remove('activetab');


    var allentries = document.getElementsByClassName("entry"); 
    document.getElementById("page-title").innerHTML = pgtitle+' ('+allentries.length+')';

    for (var i = 0; i < allentries.length; i++) {
            allentries[i].classList.remove('rem');
    }
}




//toggles for only showing apps
function showApp()
{
    var allapps = document.getElementsByClassName("app"); 
    var allentries = document.getElementsByClassName("entry"); 

    for (var i = 0; i < allentries.length; i++) {
            allentries[i].classList.add('rem');
    }
    for (var i = 0; i < allapps.length; i++) {
        if (allapps[i].classList.contains('rem')) {
            allapps[i].classList.remove('rem');
        }
    }

        document.getElementById("page-title").innerHTML = pgtitle+' ('+allapps.length+')';

    document.getElementById('all-tab').classList.remove('activetab');
    document.getElementById('all-app-tab').classList.add('activetab');
    document.getElementById('all-bot-tab').classList.remove('activetab');
    document.getElementById('all-wallet-tab').classList.remove('activetab');
    document.getElementById('all-others-tab').classList.remove('activetab');
    document.getElementById('all-mgr-tab').classList.remove('activetab');
    document.getElementById('all-analytics-tab').classList.remove('activetab');
    document.getElementById('all-lib-tab').classList.remove('activetab');

}





//toggles for only showing wallets
function showWallet()
{
    var allwallet = document.getElementsByClassName("wallet"); 
    var allentries = document.getElementsByClassName("entry"); 

    for (var i = 0; i < allentries.length; i++) {
            allentries[i].classList.add('rem');
    }
    for (var i = 0; i < allwallet.length; i++) {
        if (allwallet[i].classList.contains('rem')) {
            allwallet[i].classList.remove('rem');
        }
    }

    document.getElementById("page-title").innerHTML = pgtitle+' ('+allwallet.length+')';

    document.getElementById('all-tab').classList.remove('activetab');
    document.getElementById('all-app-tab').classList.remove('activetab');
    document.getElementById('all-bot-tab').classList.remove('activetab');
    document.getElementById('all-wallet-tab').classList.add('activetab');
    document.getElementById('all-others-tab').classList.remove('activetab');
    document.getElementById('all-mgr-tab').classList.remove('activetab');
    document.getElementById('all-analytics-tab').classList.remove('activetab');
    document.getElementById('all-lib-tab').classList.remove('activetab');

}





//toggles for only showing bots
function showBot()
{
    var allbot = document.getElementsByClassName("bot"); 
    var allentries = document.getElementsByClassName("entry"); 

    for (var i = 0; i < allentries.length; i++) {
            allentries[i].classList.add('rem');
    }
    for (var i = 0; i < allbot.length; i++) {
        if (allbot[i].classList.contains('rem')) {
            allbot[i].classList.remove('rem');
        }
    }

        document.getElementById("page-title").innerHTML = pgtitle+' ('+allbot.length+')';

    document.getElementById('all-tab').classList.remove('activetab');
    document.getElementById('all-app-tab').classList.remove('activetab');
    document.getElementById('all-bot-tab').classList.add('activetab');
    document.getElementById('all-wallet-tab').classList.remove('activetab');
    document.getElementById('all-others-tab').classList.remove('activetab');
    document.getElementById('all-lib-tab').classList.remove('activetab');
    document.getElementById('all-mgr-tab').classList.remove('activetab');
    document.getElementById('all-analytics-tab').classList.remove('activetab');

}



//toggles for only showing node manager
function showMgr()
{
    var allbot = document.getElementsByClassName("node-manager"); 
    var allentries = document.getElementsByClassName("entry"); 

    for (var i = 0; i < allentries.length; i++) {
            allentries[i].classList.add('rem');
    }
    for (var i = 0; i < allbot.length; i++) {
        if (allbot[i].classList.contains('rem')) {
            allbot[i].classList.remove('rem');
        }
    }

        document.getElementById("page-title").innerHTML = pgtitle+' ('+allbot.length+')';

    document.getElementById('all-tab').classList.remove('activetab');
    document.getElementById('all-app-tab').classList.remove('activetab');
    document.getElementById('all-bot-tab').classList.remove('activetab');
    document.getElementById('all-wallet-tab').classList.remove('activetab');
    document.getElementById('all-others-tab').classList.remove('activetab');
    document.getElementById('all-lib-tab').classList.remove('activetab');
    document.getElementById('all-mgr-tab').classList.add('activetab');
    document.getElementById('all-analytics-tab').classList.remove('activetab');

}



//toggles for only showing analytics
function showAnalytics()
{
    var allbot = document.getElementsByClassName("analytics"); 
    var allentries = document.getElementsByClassName("entry"); 

    for (var i = 0; i < allentries.length; i++) {
            allentries[i].classList.add('rem');
    }
    for (var i = 0; i < allbot.length; i++) {
        if (allbot[i].classList.contains('rem')) {
            allbot[i].classList.remove('rem');
        }
    }

    document.getElementById("page-title").innerHTML = pgtitle+' ('+allbot.length+')';

    document.getElementById('all-tab').classList.remove('activetab');
    document.getElementById('all-app-tab').classList.remove('activetab');
    document.getElementById('all-bot-tab').classList.remove('activetab');
    document.getElementById('all-lib-tab').classList.remove('activetab');
    document.getElementById('all-wallet-tab').classList.remove('activetab');
    document.getElementById('all-others-tab').classList.remove('activetab');
    document.getElementById('all-mgr-tab').classList.remove('activetab');
    document.getElementById('all-analytics-tab').classList.add('activetab');

}

//toggles for only showing libs
function showLib()
{
    var lib = document.getElementsByClassName("library"); 
    var allentries = document.getElementsByClassName("entry"); 

    for (var i = 0; i < allentries.length; i++) {
            allentries[i].classList.add('rem');
    }
    for (var i = 0; i < lib.length; i++) {
        if (lib[i].classList.contains('rem')) {
            lib[i].classList.remove('rem');
        }
    }

        document.getElementById("page-title").innerHTML = pgtitle+' ('+lib.length+')';

    document.getElementById('all-tab').classList.remove('activetab');
    document.getElementById('all-app-tab').classList.remove('activetab');
    document.getElementById('all-bot-tab').classList.remove('activetab');
    document.getElementById('all-lib-tab').classList.remove('activetab');
    document.getElementById('all-wallet-tab').classList.remove('activetab');
    document.getElementById('all-others-tab').classList.remove('activetab');
    document.getElementById('all-lib-tab').classList.add('activetab');    
    document.getElementById('all-mgr-tab').classList.remove('activetab');
    document.getElementById('all-analytics-tab').classList.remove('activetab');

}


//toggles for only showing others
function showOther()
{
    var allbot = document.getElementsByClassName("other"); 
    var allentries = document.getElementsByClassName("entry"); 

    for (var i = 0; i < allentries.length; i++) {
            allentries[i].classList.add('rem');
    }
    for (var i = 0; i < allbot.length; i++) {
        if (allbot[i].classList.contains('rem')) {
            allbot[i].classList.remove('rem');
        }
    }

        document.getElementById("page-title").innerHTML = pgtitle+' ('+allbot.length+')';

    document.getElementById('all-tab').classList.remove('activetab');
    document.getElementById('all-app-tab').classList.remove('activetab');
    document.getElementById('all-bot-tab').classList.remove('activetab');
    document.getElementById('all-lib-tab').classList.remove('activetab');
    document.getElementById('all-wallet-tab').classList.remove('activetab');
    document.getElementById('all-others-tab').classList.add('activetab');
    document.getElementById('all-mgr-tab').classList.remove('activetab');
    document.getElementById('all-analytics-tab').classList.remove('activetab');

}





var appslist = document.getElementById("apps-list");
var appscontent = '';
var official = '';
var git = '';
var caption = '';


window.onload = (function(){


  //load all apps
  ajax_get('https://idena-dev.com/source/apps', function(data) {
    //console.log(data);


        ajax_get('https://idena-apps.org/locale/'+lang+'.json', function(data2) {

                //load all page lang

                document.getElementById("back").innerHTML = data2["back"];
                document.getElementById("title").innerHTML = data2["apps_t"];
                document.getElementById("all-tab").innerHTML = data2["all"];
                document.getElementById("all-app-tab").innerHTML = data2["apps"];
                document.getElementById("all-bot-tab").innerHTML = data2["bots"];
                document.getElementById("all-wallet-tab").innerHTML = data2["wallets"];
                document.getElementById("all-mgr-tab").innerHTML = data2["managers"];
                document.getElementById("all-others-tab").innerHTML = data2["other"];
                document.getElementById("all-analytics-tab").innerHTML = data2["analytics"];
                document.getElementById("all-lib-tab").innerHTML = data2["libraries"];


                pgtitle = data2["all"]+' '+data2["apps"];
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
                  if(obj.github!=""){
                        git = '<a class="btn btn-secondary btn-small" href="'+obj.github+'" target="_blank">'
                                        +'<span>'+data2["github"]+'</span>'
                                        +'<i class="icon icon--thin_arrow_right"></i>'
                                      +'</a>';
                    } else { git = '<a class="btn btn-secondary btn-small" href="'+obj.github+'" disabled>'
                            +'<span>'+data2["github"]+'</span>'
                            +'<i class="icon icon--thin_arrow_right"></i>'
                          +'</a>'; }
                  appscontent = appscontent + '<div class="col-12 col-sm-3 entry '+obj.category+'">'
                                      +'<div class="mini-card">'
                                      +'<a href="'+obj.url+'" target="_blank"><div class="thumbnail" style="background-image: url('+obj.image_url+');">'+official+'</div></a>'
                                      +'<p class="desc" style="padding-bottom: 0px;">'
                                       +obj.short_description
                                      +'</p>'
                                      +'<p class="control">By '+obj.created_by+'</p>'
                                      +'<a class="btn btn-secondary btn-small" href="'+obj.url+'" target="_blank">'
                                        +'<span>'+data2["app_details"]+'</span>'
                                        +'<i class="icon icon--thin_arrow_right"></i>'
                                      +'</a>'
                                      +git
                                      +'</div>'
                                    +'</div>'; 
                });

                appslist.innerHTML = appscontent;

        });
      
  }); //fetching all the apps listed


})();