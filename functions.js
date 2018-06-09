(function() {
///////////////////////////////// FUNCTIONS ////////////////////////////////////

/////////////////// Function declaration

function hello() {
	return 'hello world';
}
p(hello());						// 'hello world'

/////////////////// Function expression

const goodbye = function() {
	return 'bye bye';
}
p(goodbye());					// 'bye bye'

const adios = function ciao() {	// !!!! Can still name assigned function. Better for debugging.
	return 'hasta luego';
}
p(adios());						// 'hasta luego'


// Assign to other variables
const hi = hello;				// Ref to complete function only - still needs to be invoked
p(hi);							// f hello() {...}
p(hi());						// 'hello world'

const bye = goodbye();			// CALLED, THEN ref to RETURN value !!! 
p(bye);							// 'bye bye'


// No explicit return value
function later() {
	console.log('return value is undefined');
}
p(later());						// undefined	!!


////////////////////// Params and Arguments

function avg(a,b) {
	return (a + b) / 2;
}
p(avg(12, 26));					// 19
p(avg(2, 4, 52, 99));			// 3 	Additional args ignored


function arguments() {
	return arguments;
}
p(arguments(7, 'abc'));			// {'0': 7, '1': 'abc'} 	Object also has props 'callee', 'length' etc
								// NB: can access arguments[0] etc, but not true array with methods etc 


/////////////////////// ES6 rest operator

function betterArgs(...args) {
	return args;				// proper array
}
p(betterArgs('ES6', true));		// ['ES6', true]

function rest(...args) {
	for(arg of args) {			// Array access
		console.log(arg);
	}
}
rest(4,5,6);					// 4
								// 5
								// 6

//////////////////////// ES6 Default parameters		(should always come after non-default params)

function fallback(name='world') {
	return `hello ${name}`;
}
p(fallback());					// 'hello world'
p(fallback('ladies'));			// 'hello ladies'


//////////////////////// Arrow functions

const square = x => x * x;		/* Single param doesnt require brackets. Single statement 
								   CAN be same line (optional), and has implicit return value!! */
p(square(4));					// 16

const sum = (x,y) => x + y;		// multiple params require brackets
p(sum(4,6));					// 10

const noParam = () => {			// Empty brackets required for func with no params. 
	// do stuff here			// Braces required for multiple statements.
	p('arrow no params');
}
noParam();


////////////////////////// Hoisting

hoist();
function hoist() {
	p('function declarations are hoisted');
}

//notHoisted();								// ReferenceError!! notHoisted is not defined
const notHoisted = () => {
	p('function expressions aren\'t hoisted');
}


////////////////////////// Callbacks

function jedi(name, callback) {				// ReferenceError if callback not defined at all. 
	p(`Jedi is ${name}`);
	if(typeof callback === 'function') {	// Optional safeguard for TypeErrors only. 
		callback();							
	}
	else {
		p('callback was not function');		// Will run if defined but not function
	}
}

function yodaCallback() {
	p('The force is strong');
}

function vaderCallback() {
	p('I am your father');
}

const nonFunc = 'not a function';

jedi('Yoda', yodaCallback);
jedi('Darth Vader', vaderCallback);
jedi('Windu', nonFunc);						// Non-function passed as callback. Error 
jedi('Kylo', () => {
	p('dunno him')							// Anonymous funcs can be passed for one-offs but not ideal.
});




})();

