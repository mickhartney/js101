(function() {
/////////////////////////////////////// HTML5 API'S ///////////////////////////////////	


//////////////////// -DATA ATTRIBUTE

const hero = document.getElementById('hero');
const pow = hero.dataset.powers;				// acess all (data-powers)
p(pow);


/////////////////// WEB STORAGE (localStorage, sessionStorage)

// get/set
localStorage.setItem('name', 'Mick');
p(localStorage.getItem('name'));

// alternatively just assign
localStorage.user = 'Bob';
p(localStorage.user);

// remove
localStorage.removeItem('name');
delete localStorage.user;

localStorage.clear();		// remove all items

p(localStorage.getItem('name'));
p(localStorage.user);


// When value is saved (changed) an event is fired on OTHER windows/tabs from same domain!!  
addEventListener('storage', (event) => {
 console.log(`The ${event.key} was updated from${event.oldValue} 
 	to ${event.newValue} and saved in ${event.storageArea}`) }, false);


////////////////// GEOLOCATION

	/* requires permission */

/*
navigator.geolocation.getCurrentPosition(youAreHere);	// passes position object to callback (youAreHere)

function youAreHere(position) {
 p(`Latitude: ${position.coords.latitude}, 			// coords props
 	Longitude: ${position.coords.longitude}`);
}

const id = navigator.geolocation.watchPosition(youAreHere);	// called when position changes (returns ID)
navigator.geolocation.clearWatch(id);
*/


////////////////// WEB WORKERS

	/* Allows slow processes to be run in background to avoid 'script unresponsive' msg 
		by running on a different thread (JS is normally single-threaded) */

/*
const worker = new Worker('task.js');	// Async download, then workers start

// post date to worker
worker.postMessage('Hello');

// post data from worker
self.postMessage('bye');		// self refers to worker from within worker file

// message event fired
worker.addEventListener('message', (event) => {
	p(event.data);
}, false);

// stop worker from main
worker.terminate();

// stop worker from worker
self.close();

// demo - factor.js hosted on server. Else turn off same origin policy setting in browser
//main.js
function factorize(event) {
	// prevent the form from being submitted
	event.preventDefault();
	document.getElementById('output').innerHTML = '<p>This could take a while ...</p>';
	const number = Number(form.number.value);
	if(window.Worker) {
	    const worker = new Worker('factors.js');
	    worker.postMessage(number);
	    worker.addEventListener('message', (event) => {
	    document.getElementById('output').innerHTML = event.data;
	    }, false);
	} 
}

// factor.js
self.addEventListener('message', (event) => {
	const factors = String(factorsOf(Number(event.data)));
	self.postMessage(factors);
	self.close();
}, false);

*/


//// SERVICE WORKERS - investigage further

	/* 	Intercept network request and take action if offline
		Access to push notifications and background syncing
		Requires HTTPS
	*/


/////////////// WEBSOCKETS (Useful for things like chat apps)

	/* 	Two-way communication with server... or PUSH MESSAGING
		Connection is kept open and response pushed when it's received


const URL = 'wss://echo.websocket.org/';				// secure websockets protocol 'wss'
const outputDiv = document.getElementById('output');
const form = document.forms[0];
const connection = new WebSocket(URL);				// creates new instance and tries to connect

// success ('open')
connection.addEventListener('open', () => {			// event called on connection object
    output('CONNECTED');
}, false);

// callback
function output(message) {
	const para = document.createElement('p');
	para.innerHTML = message;
	outputDiv.appendChild(para);
}

form.addEventListener('submit', message, false);

function message(event) {
	event.preventDefault();
	const text = form.message.value;
	output(`SENT: ${text}`);				// display msg text
	connection.send(text);					// send
}

connection.addEventListener('message', (event) => {		// received message
	output(`RESPONSE: ${event.data}`);
}, false);


///////////////// NOTIFICATIONS   (requires permission)

if(window.Notification) {
	Notification.requestPermission() 	//returns promise with permission property = 'denied' or 'granted'
	.then((permission) => {
   		if(Notification.permission === 'granted') {
   	 		new Notification('Hello JavaScript!');
    	}
	}); 
}

notification.close();


//////////////// MULTIMEDIA


<audio src='/song.mp3' controls>
	Your browser does not support the audio element.		// fallback
</audio>

<video src='http://movie.mp4' controls>
	Your browser does not support the video element.
</video>

const video = document.getElementsByTagName('video')[0];

// Methods & props

video.play();
video.pause();

video.volume = 0.9;
video.muted = true;
video.currentTime += 10; // jumps forward 10 seconds
video.playbackRate = 8; // fast-forward at 8 times as fast
video.loop = true;
video.duration;

// some props only available when all metadata received
video.addEventListener('loadedmetadata', () => {p(video.duration); });

// Other events
play
pause
volumechange

*/


////////////////// OTHER APIS - To Do: research


////////////////// CANVAS


const canvasElement = document.getElementById('canvas');
const context = canvasElement.getContext('2d');		// object with specific drawing methods (3d)

// set
context.fillStyle = "#0000cc"; 		// a blue fill color
context.strokeStyle = "#ccc"; 		// a gray stroke color
context.lineWidth = 4;

// draw
context.fillRect(10,10,100,50);
context.strokeRect(10,100,100,50);

// lines
context.beginPath();
context.moveTo(130, 50);
context.lineTo(180, 50);
context.moveTo(155, 50);
context.lineTo(155, 90);
context.strokeStyle = '#c00';	// re-assigned
context.lineWidth = 15;
context.stroke();				// required to draw

// arcs
context.beginPath();
context.arc(200, 200, 30, 0, Math.PI * 2, false);
context.strokeStyle = '#ff0';
context.lineWidth = 4;
context.stroke();

// text
context.fillStyle = '#0c0'; // a blue fill color
context.font = 'bold 26px sans-serif';
context.fillText('Hello', 20, 200);



})();