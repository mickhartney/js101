(function() {
///////////////////////////////// WINDOW ////////////////////////////////////

x = 5;								// undeclared var attached to global object
p(window.x == x);					// window global object (BROWSER OBJECT MODEL)

/////////// GLOBAL METHODS

window.parseInt(4.5);				// 4  
window.isNaN(0);					// false
// ES6 added to Number Object
Number.parseInt(4.5);				// 4  
Number.isNaN(0);					// false

// window.alert('hello');			// always returns undefined
// window.confirm('Question?');		// returns boolean (ok: true, cancel: false)
// window.prompt('enter name');		// returns string or null


//////////////////////////// NAVIGATOR

// window.navigator 				// heaps of props
p(window.navigator.userAgent);		// !!! unreliable & deprecated - can be modified by user etc


//////////////////////////// LOCATION

/* 
	Many of these properties can be set!!!
	window.location.href = 'https://www.sitepoint.com/javascript/'		
*/

p(window.location.href);			// returns full url string
// window.location. protocol;		// Eg. 'http'
// window.location.host;			// Eg. 'www.sitepoint.com'  - domain (and port number if not default 80)
// window.location.hostname;		// Eg. 'www.sitepoint.com'  - domain
// window.location.port;			// port number - empty string if not explicit in url
// window.location.pathname			// EG. '/javascript-novice-to-ninja' - pathname following domain
// window.location.search			// Eg. '?q=xyz&p=abc'
// window.location.hash				// Eg. '#fragment' or empty string
// window.location.origin			// Eg. 'www.sitepoint.com' - protocol and domain that page originated from

// window.location.reload();		// reload current page
// window.location.reload(true);	// force reload from server, not cache

// window.location.assign('http://www.abc.com/');	// load another resource
// window.location.replace('http://www.abc.com/');	// similar to assign but current page not stored in session history
// window.location.toString();		// returns url string  (same as .href)


///////////////////////////// HISTORY

// window.history.length;			// how many pages visited before current
// window.history.go(-1);			// go back 1 page
// window.history.go(0);			// reload page
// window.history.go(1);			// go forward 1 page
// window.history.forward();		
// window.history.back();			


//////////////////////////// CONTROLLING WINDOWS

	/* Mostly bad idea and often not allowed by browsers */

// const popup = window.open('http://xyz.com','Title','width=400,height=400,resizable=yes');
// popup.close();					// needs variable reference
// window.moveTo(0,0);				// only allowed after .open()
// window.resizeTo(800, 1000);		// only allowed after .open() & no other tabs open


//////////////////////////// SCREEN

	/* More useful for mobile. Change in orientation etc */

p(window.screen.height);
p(window.screen.width);
p(window.screen.availHeight);		// excludes browser chrome
p(window.screen.availWidth);		// excludes browser chrome
p(window.screen.colorDepth);		


/////////////////////////// COOKIES 		(consider COOKIES.JS or similar library)

	/* 
		Maximum 4KB data each, and 20 cookies per domain.
		Localstorage may be better option for storing data. 
		!!!!! Current legislation requires user permission before using cookies!!

		Cookies stored in text file with format such as:
		"name=Superman; hero=true; city=Metropolis"
	*/


////// Creating cookies

document.cookie = 'name=Superman';
document.cookie = 'hero=true';			// Will just append, not over-write


////// Changing cookies

document.cookie = 'name=Batman';		// re-assign with same name


////// Reading cookies

// document.cookie: 					

// split to name/value pairs. loop and split into name, val
const cookies = document.cookie.split("; ");	
for (crumb of cookies) {
	const [key,value] = crumb.split("=");
	console.log(`The value of ${key} is ${value}`);
}


////// Expiry dates
	
	/* 
		Cookies are session by default.
		'Session restore' feature can undermine expiry!!!
	*/

const expiryDate = new Date();
const tomorrow = expiryDate.getTime() + 1000 * 60 * 60 * 24;
expiryDate.setTime(tomorrow);
document.cookie = `name=Batman; expires=${ expiryDate.toUTCString()}`;		// must be UTC string

// alternative - IE10+
document.cookie = 'name=Batman; max-age=86400';		// 86400 sec


////// Path and domain

	/* By default cookies can only be read by pages in same directory and domain */

document.cookie = 'name=Batman; path=/';				// any page in root
document.cookie = 'name=Batman; domain=sitepoint.com';	// allow sub-domains (eg. javascript.sitepoint.com)


////// Secure cookies

document.cookie = 'name=Batman; secure';			// https transmission


////// Deleting cookies

document.cookie = 'name=Batman; expires=Thu, 01 Jan 1970 00:00:01 GMT'; // set expiry time to past


////////////////////////////////// TIMING

/* Beware of using THIS with timers calling methods as it CAN (external timer?) point to window object, 
	not to the methods own object!!  */

////// setTimeout

window.setTimeout(() => {p('timeout triggered')}, 3000);
//window.clearTimeout(variableRef);

////// setInterval

function intervalMsg() {
	p('interval fired');
}

const chime = window.setInterval(intervalMsg, 5000);
window.clearInterval(chime);


////// Animation 					(CSS is usually better option!!)

const squareElement1 = document.getElementById('square1');
const squareElement2 = document.getElementById('square2');
let angle = 0;

	// with interval 				(not very smooth)
setInterval( () => {
	angle = (angle + 2) % 360;
	squareElement1.style.transform = `rotate(${angle}deg)`
}, 1000/60);


	// requestAnimationFrame		(IE10+)
function rotate() {
	angle = (angle + 2) % 360;
	squareElement2.style.transform = `rotate(${angle}deg)`;
	window.requestAnimationFrame(rotate);	// can't set frame rate - usually 60p/s (device optimised)
}

const id = requestAnimationFrame(rotate);
//window.cancelAnimationFrame(id);



})();