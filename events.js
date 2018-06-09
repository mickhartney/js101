(function() {
///////////////////////////////// EVENTS ////////////////////////////////////

///////////////////////////// ADD LISTENER

// Usage: [elNode.]addEventListener('click', callback);		// el optional. Callback named or anon

addEventListener('click', doSomething);						// window default

function doSomething(e) {
	p(e.type);
	p(e.target);											// element
	p(`screen: (${e.screenX},${e.screenY}),		
		page: (${e.pageX},${e.pageY}), 
		client: (${e.clientX},${e.clientY})`);
	/*
		screen: screen
		page: document (scrolled)
		client: browser window (usually)
	*/
}

////////////////////////////// REMOVE LISTENER

/* 
	NB: don't use anonymous functions in addEventListener if they may be removed later
	    as removeEventListener will need to reference the function 
*/

const clickP = document.getElementById('click');

clickP.addEventListener('click', remove);

function remove(e) {
	p('removing event');
	clickP.removeEventListener('click', remove);		// e.target?
}

		
///////////////////////////// EVENT TYPES

/*
	NB: "Click" fires mouse click, Enter key and screen tap fire also. 
	    Good ALL-ROUND capture choice!!!
*/

//////// MOUSE

const mouseP = document.getElementById('mouse');

mouseP.addEventListener('mousedown', () => p('mousedown'));	// before click
mouseP.addEventListener('mouseup', () => p('mouseup'));		// before click
mouseP.addEventListener('click', () => p('click'));			
mouseP.addEventListener('dblclick', () => p('dblclick'));	// !! Fires click event on element too 
mouseP.addEventListener('mouseover', () => p('mouseover'));	// !! mouseenter better for handling bubbling??
mouseP.addEventListener('mouseout', () => p('mouseout'));	// !! mouseleave better for handling bubbling??
mouseP.addEventListener('mousemove', () => p('mousemove'));	// fires on any move inside element (!MULTIPLE)
mouseP.addEventListener('mouseenter', () => p('mouseenter'));
mouseP.addEventListener('mouseleave', () => p('mouseleave'));


//////// KEYBOARD

/*
	keydown		// fires CONTINUOUSLY while key is held
	keypress	// fires after keydown and before keyup. Only for keys that produce CHARACTER input or delete
	keyup		// fies when key is released
*/

addEventListener('keypress', (e) => {
	p(e.key);
	p(e.keyCode);
});


// Modifier keys

/* 
	NB: Shift, Control, Alt and command will ONLY fire on keydown and keyup!!! 
	   Event object will store info about whether modifier key was being held down
*/

addEventListener('keyup', (e) => {
	p(e.altKey);
	p(e.shiftKey);
	p(e.ctrlKey);
});


//////// TOUCH

/*
	touchstart	// !!Warning. Fires immediately so may prevent swipe, zoom etc
	click		// mimics 'tap'. 300ms delay allows other touch interaction
	touchend	// user stops touching device
	touchmove	// continuous contact and move
	touchenter	// alredy touching screen and moves over element
	touchleave	// already touching screen and leaves element
	touchcancel	// occurs when touch event interrupted
*/

/*
	NB: currently no support for SWIPE/GESTURE events. Use library such as HAMMER.JS
*/


//// TOUCH EVENT PROPERTIES 	(difficult to impliment and still experimental)

/*
	event.touches.length		// 2 for two fingers etc
	event.touches[0]			// first touch object
	touch.screenX/screenY		// co-ords
	touch.identifier			// unique ID to ensure dealing with same touch object				
*/



						/*	TO DO:  OTHER EVENT TYPES!!!!    */


//////////////////////// DEFAULT BEHAVIOUR

/*
	event.preventDefault()				// links, submit etc
	event.stopPropagation()				

*/


///////// BUBBLING and CAPTURING

/* 
	NB: Bubbling is default but this can be changed via 3rd parameter to addEventListener 

	Eg. myElement.addEventListener('click', doSomething, true)		// switch to capturing!!
	    myElement.addEventListener('click', doSomething, false)		// switch back to bubbling!!
*/


///////// DELEGATION

/*
	NB: adding listener to parent/ancestor and allowing to bubble means fewer listeners
		and also allows dynamically added children to inherit listener

	Eg. ulElement.addEventListener('click',highlight);		// listen on <li>'s
*/



})();