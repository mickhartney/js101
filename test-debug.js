(function() {
///////////////////////////////// TESTING & DEBUGGING ////////////////////////////////////

'use strict';							// not required in ES6 modules (default)


////////////// FEATURE DETECTION		(use Modernizr!!)

if (window.unicorn) {					// prevent exception being thrown 
	fantasy.activate();
}


////////////// DEBUGGER KEYWORD			PRETTY HANDY!!

/*
function one() {
	let a = 5;
	debugger;							// !!!!!! pause program for devTools inspection
	two();
}
one();
*/


////////////// ERROR OBJECTS

const error = new Error('Oopsie...');	// constructor creates custom error object

/*	Other Error objects
	---------------------
	RangeError							// NUMBER is outside valid range
	ReferenceError						// reference to an item that doesn't exist
	SyntaxError							
	TypeError							// i.e. string used when number expected
	URIError							// problem encoding/decoding URI
	InternalError						// javascritp engine (eg. too much recursion)

	Error object properties
	-----------------------
	name								// returns name of constructor function (ReferenceError)
	message								// description - should be passed as arg when constructing
	stack								// returns stack trace (!non-standard)

NB: these can all be used as constructors to create new error objects 			*/

const newTypeError = new TypeError('wrong type!');


////////////// THROWING ERRORS

/*
	throw new Error('Something has gone badly wrong!');
 	throw error;
 	throw newTypeError;
*/

function squareRoot(num) {
	if (num < 0) {
		throw new RangeError(`Can't find the root of neg numbers`);
	}
	else {
		return Math.sqrt(num);
	}
}

//p(squareRoot(-64));


////////////// EXCEPTION HANDLING


	/* All errors in PRODUCTION environment should be 'caught' so program doesn't crash */

// try, catch, finally

function imaginarySquareRoot(number) {
	let answer;
	try {									// exceptions will be passed to 'catch' instead of halting program
	    answer = String(squareRoot(number));// ! call to squareRoot() - error generated there
	} 
	catch(error) {							// will only run if exception is thrown from 'try' block
	    p(error.name);						// 'RangeError'
	    p(error.message);					// 'Can't find the root of neg numbers'
	    p(error.stack);						// stack trace
	    answer = squareRoot(-number)+'i';	// handle gracefully (i.e. don't throw error)
	} 
	finally {								// !!! ALWAYS runs. Even if no error throw
		return answer;
	}
}

p(imaginarySquareRoot(-64));				// 8i
p(imaginarySquareRoot(64));					// 8


//////////////// TESTS

function isRoot4() {
	return squareRoot(4) === 2;				// basic concept
}
p(isRoot4());								// true


/*	Frameworks
	------------
	JEST			// facebook! (React)
	Jasmine			// allows DOM-less and ASYNC. Assertions and mocks built-in.
	Mocha			// TDD & BDD, Node & browser, supports various assertion libraries. Need to configure.
	QUnit			// Very easy start from scratch. No source-maps.
	AVA 			// minimal
	Tape			// minimal
*/


})();