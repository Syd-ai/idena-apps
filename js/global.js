
var imgURL = './images/idena-logo-dark.svg';
var moonURL = './images/moon.svg';
var sunURL = './images/sun.svg';
var parent = document.querySelector(".header_logo");

parent.querySelector("a img").src = imgURL;
var mode = localStorage.getItem('mode') || '';

var lang = localStorage.getItem('lang') || 'en';


var parent2 = document.querySelector(".justify-content-between");
var lang_select = parent2.querySelector(".col-5");
var modechange = parent2.querySelector(".col-auto:last-child");


document.getElementsByClassName('header')[0].classList.add('fixed-header');
document.getElementsByClassName('main')[0].classList.add('extra-main-padding');


var scrolltop = '<button type="button" class="btn btn-icon hide" id="scrollTop" onclick="window.scrollTo({ top: 0, behavior: \'smooth\' });">'
				+'<i class="icon icon--thin_arrow_up"></i></button>';

document.querySelector(".section:last-child").innerHTML = document.querySelector(".section:last-child").innerHTML + scrolltop;


var htmcontent = '<button type="button" id="moon" class="rem btn btn-icon"'
						+' onclick="localStorage.setItem(\'mode\', \'dark\');'
            +'document.querySelector(\'.header_logo a img\').setAttribute(\'src\',\''+imgURL+'\');'
            +'document.getElementsByTagName(\'html\')[0].classList.add(\'darkmode\');'
            +'document.getElementById(\'moon\').classList.add(\'rem\');'
            +'document.getElementById(\'sun\').classList.remove(\'rem\');'
						+'" id="moon">'
						+'<img src="'+moonURL+'" width="18px" height="18px"' 
						+'style="opacity: 0.8;"/></button>'
            +'<button type="button" id="sun" class="rem btn btn-icon"'
						+' onclick="localStorage.setItem(\'mode\', \'light\'); document.getElementsByTagName(\'html\')[0].classList.remove(\'darkmode\');'
            +'document.querySelector(\'.header_logo a img\').setAttribute(\'src\',\'./images/idena-logo.svg\');'
            +'document.getElementById(\'moon\').classList.remove(\'rem\');'
            +'document.getElementById(\'sun\').classList.add(\'rem\');'
						+'" id="sun">'
						+'<img src="'+sunURL+'" width="18px" height="18px"' 
						+'style="opacity: 0.8;"/></button>'; 

modechange.innerHTML = htmcontent;

var langcontent = '<select id="langSelect" onchange="langchange()">'
+'<option id="lang_en" value="en">🇺🇸English - EN</option>'
+'<option id="lang_cn" value="cn">🇨🇳中文 - CN</option>'
+'<option id="lang_fr" value="fr">🇫🇷Française - FR</option>'
+'<option id="lang_hi" value="hi">🇮🇳हिन्दी - HI</option>'
+'<option id="lang_id" value="id">🇮🇩Bahasa Indonesia - ID</option>'
+'<option id="lang_ru" value="ru">🇷🇺русский - RU</option>'
+'<option id="lang_sr" value="sr">🇷🇸Српски - SR</option>'
+'<option id="lang_es" value="es">🇪🇸Español - ES</option>'
+'<option id="lang_uk" value="uk">🇺🇦українська - UK</option>'
+'</select>';

lang_select.innerHTML = langcontent;

document.getElementById("lang_"+lang.toString()).setAttribute("selected", "true");

function langchange()
{
  var x = document.getElementById("langSelect").value;
  localStorage.setItem('lang', x);
  location.reload();
}


if (mode =='dark') {
  parent.querySelector("a img").src = imgURL;
  document.getElementById('sun').classList.remove('rem');

} else {
  parent.querySelector("a img").src = './images/idena-logo.svg';
  document.getElementById('moon').classList.remove('rem');
} 


var disclaimer = document.getElementById("disclaimer");
disclaimer.innerHTML = '* DISCLAIMER: Idena community makes no representations or warranties of any kind concerning the safety, suitability, lack of viruses or inaccuracies of the listed apps. There are inherent dangers in the use of any software, and you are solely responsible for determining whether listed apps are compatible with your equipment and other software installed on your equipment. Furthermore, users commit themselves to a legally appropriate use of the listed apps according to the respective national as well as international law.'
          +'You are also solely responsible for the protection of your equipment and backup of your data, and the app maker will not be liable for any damages or loss of DNA you may suffer in connection with using, modifying, or distributing the open-source listed apps.';


var donation = document.getElementById("donation");
donation.innerHTML = '<p class="desc" style="line-height: 2em;">Idena Apps is maintained by community member <a href="http://github.com/bingbinglee/" target="_blank">@bingbinglee.</a> Please support by donating to <a href="https://scan.idena.io/address?address=0x140d5add76f3e4cc4538b9809601383bd74689df" target="_blank">'
                +'<span class="donate">0x140d5add76f3e4cc4538b9809601383bd74689df</span></a></p>';

var sticky = document.getElementsByClassName('header')[0].offsetTop;

window.onscroll = function() {shadowFunction()};

function shadowFunction() {
  if (window.pageYOffset > sticky) {
    document.getElementsByClassName('header')[0].classList.add('header-shadow');
    document.getElementById('scrollTop').classList.remove('hide');
  } else {
    document.getElementsByClassName('header')[0].classList.remove('header-shadow');
    document.getElementById('scrollTop').classList.add('hide');
  }
}
