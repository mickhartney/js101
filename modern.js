(function() {
/////////////////////////////////////// MODERN JS ///////////////////////////////////	


////////////////////////////////// MODULES ////////////////////////  

/*

//////// Most basic export //////

export const PI = 3.14;

import { PI } from './pi.js';		// demo file (same dir)
p(PI);								// can now use PI var


//////// Export functions ///////

function square(x) {
	return x * x;
}

function sum(array, callback) {
	if(callback) {
	    array = array.map(callback);
	}
	return array.reduce((a,b) => a + b );
}

function privateFunc() {					// not exported 
	log('mind your business');
}

export {
	square,
	sum
}

import { square, sum } from './stats.js';


////////// Import EVERYTHING (public) - if large number of props/funcs ///////

import * as stats from './stats.js'			

stats.square(5);					// namespaced to 'stats' 


///////// Default exports /////////

export default PI;
export default square;


const stats = {
	square(x) {
		return x * x;
	},
	sum(x, y) {
		return x + y;
	}
}

export default stats				// export object as default

// import
import PI from './pi.js';
import square from './square.js';
import stats from './stats.js';		// no curly braces!!


///////// Aliases ////////////

import sq from './square.js'		// doesn't have to match name in actual module
sq(8)


/////////////////////////////// NODE.JS MODULES (common js) /////////////////

// export
module.exports = x =>  x * x;		// anon function assigned to exports

// import (require)
const square = require('./squareFunction');

// usage
square(6);							// function now assigned to var square

*/


///////////////////////////////////////// MVC /////////////////////////////////////



const form = document.forms[0];

class Item {
	constructor(name) {
	    this.name = name;
	} 
}

const controller = {
	watch(form) {
	    form.addEventListener('submit', (event) => {
			event.preventDefault(); 
			this.add(form.name.value); 
		}, false);
	},
	add(name) {
	    const item = new Item(name);
	    view.render(item);
	} 
};

const view = {
	render(item) {
		const list = document.getElementById('list');
	    const li = document.createElement('li');
	    li.innerHTML = item.name;
	    list.appendChild(li);
	    form.name.value = '';	// reset the input field
	}
}

controller.watch(form);



})();