
var imgURL = './images/idena-logo-dark.svg';
var moonURL = './images/moon.svg';
var sunURL = './images/sun.svg';
var parent = document.querySelector(".header_logo");

parent.querySelector("a img").src = imgURL;
var mode = localStorage.getItem('mode') || '';



var parent2 = document.querySelector(".justify-content-between");
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
            +'document.querySelector(\'.header_logo a img\').setAttribute(\'src\',\'https://scan.idena.io/images/idena-logo.svg\');'
            +'document.getElementById(\'moon\').classList.remove(\'rem\');'
            +'document.getElementById(\'sun\').classList.add(\'rem\');'
						+'" id="sun">'
						+'<img src="'+sunURL+'" width="18px" height="18px"' 
						+'style="opacity: 0.8;"/></button>'; 

modechange.innerHTML = htmcontent;


if (mode =='dark') {
  parent.querySelector("a img").src = imgURL;
  document.getElementById('sun').classList.remove('rem');

} else {
  parent.querySelector("a img").src = 'https://scan.idena.io/images/idena-logo.svg';
  document.getElementById('moon').classList.remove('rem');
} 



if (window.location.href.indexOf("videos") > -1) {
      document.getElementById('videos-tab').classList.add('active');
      document.getElementById('videos').classList.add('active');
} else if (window.location.href.indexOf("apps") > -1) {
      document.getElementById('apps-tab').classList.add('active');
      document.getElementById('apps').classList.add('active');
} else if (window.location.href.indexOf("explorer") > -1) {
      document.getElementById('explorer-tab').classList.add('active');
      document.getElementById('explorer').classList.add('active');
} else if (window.location.href.indexOf("communities") > -1) {
      document.getElementById('communities-tab').classList.add('active');
      document.getElementById('communities').classList.add('active');
} else {}


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