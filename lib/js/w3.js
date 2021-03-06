var SEC = 0;
var IDX = 0;
var NUM = 0;
(function() {
	function detectmob() {
		if (navigator.userAgent.match(/Android/i)
				|| navigator.userAgent.match(/webOS/i)
				|| navigator.userAgent.match(/iPhone/i)
				|| navigator.userAgent.match(/iPad/i)
				|| navigator.userAgent.match(/iPod/i)
				|| navigator.userAgent.match(/BlackBerry/i)
				|| navigator.userAgent.match(/Windows Phone/i)) {
			return true;
		} else {
			return false;
		}
	}
})();
(function() {
	document.getElementById("navigate").style.display = "none";
	var i = 0;
	request('src/area_' + i + '/area_' + i + '_0.css', 'myst');
	request('src/area_' + i + '/area_' + i + '_0.txt', 'contents');
	var menu_l = document.getElementById("menu-large");
	for(var i=0; i<menu_l.children.length; i++) {
		(function(i) {
			menu_l.children[i].addEventListener("click", function() {
				clear('contents');
				clear('overview');
				document.getElementById("navigate").style.display = "none";
				document.getElementById("prevtonext").style.display = "none";
				document.getElementById("pagination").style.display = "none";
				document.getElementById("archives").style.display = "none";
				document.getElementById("contents").style.display = "block";
				request('src/area_' + i + '/area_' + i + '_0.css', 'myst');
				if(i > 1) {
					SEC = i;
					IDX = 0;
					document.getElementById("navigate").style.display = "block";
					document.getElementById("overview").style.display = "block";
					document.getElementById("pagination").style.display = "block";
					document.getElementsByClassName("next")[0].style.display = "block";
					document.getElementsByClassName("prev")[0].style.display = "none";
					request('src/area_' + i + '/area_' + i + '_0.txt', 'overview');
				} else {
					request('src/area_' + i + '/area_' + i + '_0.txt', 'contents');
				}
			});
		})(i);
	}
	var menu_s = document.getElementById("menu-small");
	for(var i=0; i<menu_s.children.length; i++) {
		(function(i) {
			menu_s.children[i].addEventListener("click", function() {
				clear('contents');
				clear('overview');
				var x = document.getElementById("menu-small");
				if (x.className === "w3-menu-small" && i != 0) {
					x.className += " responsive";
				} else {
					x.className = "w3-menu-small";
				}
				if(i < 4) {
					document.getElementById("navigate").style.display = "none";
					document.getElementById("prevtonext").style.display = "none";
					document.getElementById("pagination").style.display = "none";
					document.getElementById("archives").style.display = "none";
					document.getElementById("contents").style.display = "block";
					request('src/area_' + i + '/area_' + i + '_0.css', 'myst');
					if(i > 1) {
						SEC = i;
						IDX = 0;
						document.getElementById("navigate").style.display = "block";
						document.getElementById("overview").style.display = "block";
						document.getElementById("pagination").style.display = "block";
						document.getElementsByClassName("next")[0].style.display = "block";
						document.getElementsByClassName("prev")[0].style.display = "none";
						request('src/area_' + i + '/area_' + i + '_0.txt', 'overview');
					} else {
						request('src/area_' + i + '/area_' + i + '_0.txt', 'contents');
					}
				}
			});
		})(i);
	}
})();
if (window.addEventListener) {
	window.addEventListener("scroll", function() {render();});
	window.addEventListener("resize", function() {render();});
	window.addEventListener("touchmove", function() {render();});
	window.addEventListener("load", function() {render();});
} else if (window.attachEvent) {
	window.attachEvent("onscroll", function() {render();});
	window.attachEvent("onresize", function() {render();});
	window.attachEvent("ontouchmove", function() {render();});
	window.attachEvent("onload", function() {render();});
}
function clear(id) {
	document.getElementById(id).innerHTML = "";
}
function render() {
	var width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
	var top = scrolltop();
	if (width < 993 && width > 600) {
		if (top > 100) {
			document.getElementById("main").style.paddingTop = "44px";
			document.getElementById("menu").style.position = "fixed";
			document.getElementById("menu").style.top = "0";
		} else {
			document.getElementById("main").style.paddingTop = "0";
			document.getElementById("menu").style.position = "relative";
		}
	} else {
		if (top > 66) {
			document.getElementById("main").style.paddingTop = "44px";
			document.getElementById("menu").style.position = "fixed";
			document.getElementById("menu").style.top = "0";
		} else {
			document.getElementById("main").style.paddingTop = "0";
			document.getElementById("menu").style.position = "relative";
		}
	}
}
function scrolltop() {
	var top = 0;
	if (typeof (window.pageYOffset) == "number") {
		top = window.pageYOffset;
	} else if (document.body && document.body.scrollTop) {
		top = document.body.scrollTop;
	} else if (document.documentElement && document.documentElement.scrollTop) {
		top = document.documentElement.scrollTop;
	}
	return top;
}

function request(url, id) {
    var xhttp = new XMLHttpRequest();
    start_loader();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById(id).innerHTML = this.responseText;
            var text = this.responseText;
            while(text.indexOf("<script>") >= 0 && text.indexOf("</script>") >= 0) {
            	eval(text.substring(text.indexOf("<script>") + 8, text.indexOf("</script>")));
            	text = text.replace(text.substring(text.indexOf("<script>"), text.indexOf("</script>") + 9), "");
            }
            close_loader();
        } else {
        	document.getElementById(id).innerHTML = "";
        }
    }
    xhttp.open("GET", url, true);
    xhttp.send();
    document.documentElement.scrollTop = 0;
}

function fetch(obj) {
	if((typeof obj) === "object") {
        if(Object.prototype.toString.call(obj) === "[object Array]") {
            for(var i=0; i<obj.length; i++) {
                if(obj[i].url === undefined || obj[i].id === undefined) continue;
                request(obj[i].url, obj[i].id);
            }
        }
    }
}

function file() {
    document.getElementById("overview").style.display = "none";
    document.getElementById("contents").style.display = "none";
    document.getElementById("navigate").style.display = "none";
    request("src/area_" + SEC + "/arch.txt", "archives");
    document.getElementById("archives").style.display = "block";
}

function initl() {
	clear('contents');
	clear('overview');
	document.getElementById("pagination").style.display = "none";
    document.getElementById("archives").style.display = "none";
    document.getElementById("overview").style.display = "none";
    document.getElementById("contents").style.display = "block";
    document.getElementById("navigate").style.display = "block";
    document.getElementById("prevtonext").style.display = "block";
}

function play() {
	var e = document.getElementById("inner-circle");
	e.getElementsByTagName("a")[0].className = "w3-hide";
	e.getElementsByTagName("a")[1].className = "w3-show";
	e.getElementsByTagName("audio")[0].play();
	document.getElementById("outer-circle").style.animation = "turning_clockwise 2s infinite linear";
	document.getElementById("inner-circle").style.animation = "turning_anticlockwise 2s infinite linear";
	e.getElementsByTagName("audio")[0].addEventListener("ended", function() {
		pause();
	});
}

function pause() {
	var e = document.getElementById("inner-circle");
	e.getElementsByTagName("a")[0].className = "w3-show";
	e.getElementsByTagName("a")[1].className = "w3-hide";
	e.getElementsByTagName("audio")[0].pause();
	document.getElementById("outer-circle").style.animation = "turning_clockwise 0s infinite linear";
	document.getElementById("inner-circle").style.animation = "turning_anticlockwise 0s infinite linear";
}

function next() {
	if(SEC == 2) NUM = 7;
	if(SEC == 3) NUM = 2;
	IDX++;
    document.getElementsByClassName("prev")[0].style.display = "block";
    document.getElementsByClassName("next")[0].style.display = "block";
    if(IDX === (NUM - 1)) {
        document.getElementsByClassName("next")[0].style.display = "none";
    }
    request('src/area_' + SEC + '/area_' + SEC + '_' + IDX + '.txt', 'overview');
}

function prev() {
    IDX--;
    document.getElementsByClassName("prev")[0].style.display = "block";
    document.getElementsByClassName("next")[0].style.display = "block";
    if(IDX === 0) {
        document.getElementsByClassName("prev")[0].style.display = "none";
    }
    request('src/area_' + SEC + '/area_' + SEC + '_' + IDX + '.txt', 'overview');
}

function close_loader(){document.getElementsByClassName("w3-loading")[0].style.display="none"}
function start_loader(){document.getElementsByClassName("w3-loading")[0].style.display="block"}