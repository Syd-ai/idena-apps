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
    

    ajax_get('https://idena-apps.org/locale/'+lang+'.json', function(data2) {

                //load all page lang
                document.getElementById("back").innerHTML = data2["back"];
                document.getElementById("title").innerHTML = data2["good_flip_t"];
                document.getElementById("page-title").innerHTML = data2["good_flip_title"];
                document.getElementById("page_subtext").innerHTML = data2["good_flip_subtext"];

                document.getElementById("good_flip_1").innerHTML = data2["good_flip_1"];
                document.getElementById("good_flip_2").innerHTML = data2["good_flip_2"];
                document.getElementById("good_flip_3").innerHTML = data2["good_flip_3"];
                document.getElementById("good_flip_4").innerHTML = data2["good_flip_4"];
                document.getElementById("good_flip_5").innerHTML = data2["good_flip_5"];
                document.getElementById("good_flip_6").innerHTML = data2["good_flip_6"];
                document.getElementById("good_flip_7").innerHTML = data2["good_flip_7"];
                document.getElementById("good_flip_8").innerHTML = data2["good_flip_8"];

                document.getElementById("disclaimer").innerHTML = data2["disclaimer"];
                document.getElementById("donation").innerHTML = '<p class="desc" style="line-height: 2em;">'+data2["donate_pretext"] 
                +'<a href="http://github.com/bingbinglee/" target="_blank">@bingbinglee.</a>'+data2["donate_posttext"]+'<a href="https://scan.idena.io/address?address=0x140d5add76f3e4cc4538b9809601383bd74689df" target="_blank">'
                +'<span class="donate">0x140d5add76f3e4cc4538b9809601383bd74689df</span></a></p>';

                //page lang load ends

    });


})();