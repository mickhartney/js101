(function() {
///////////////////////////////// ADVANCED FUNCTIONS ////////////////////////////////////

// setup only
function square(x) {
    return x * x;
}

function sum(a, b) {
	return a + b;
}

function greet() {
	p(`Hello ${this.name}`);			// !! beware global this
}

function sayHello(greeting='Hello') {	
	p(`${ greeting }, my name is ${ this.name }`);
}

const bloke = {
	name: 'Jim',
	age: 33
}

const arr = [3,5];

////////////////////////// FUNCTION PROPERTIES AND METHODS

p(square.length);						// 1 - returns number of parameters accepted


////////// CALL & APPLY METHODS !!!!!

////// CALL
greet('Bob');							// 'Hello'	(!! window.name undefined)
greet.call(bloke);						// 'Hello Jim' - set context Object as first argument

/* call with no Object context */
p(square.call(null, 5));				// 25  (function not using 'this')

/* call with parameters */
sayHello.call(bloke);					// 'Hello, my name is Jim'
sayHello.call(bloke, 'How do you do');	// 'How do you do, my name is Jim'
p(sum.call(null, 2, 2));				// 4 - pass multiple parameters separately


////// APPLY
p(square.apply(null, [4]));				// 16 - (ONLY) accepts array as arg (even if only 1)
p(sum.apply(null, arr));				// 8

/* No need for APPLY!! use ES6 spread operator with CALL instead!!  */
p(sum.call(null, ...arr));				// 8


////// CUSTOM PROPERTIES

square.description = 'Squares a number that is provided as an argument';
p(square.description);

// MEMOIZATION 	(uses custom property)

	/* 
		For expensive functions create a function cache Object property to store the return value
	    of each executed call. Any further calls can check if result is already stored in cache 
	    and simply return that value instead of running expensive operations.
	*/

function slowOp(x) {
	slowOp.cache = slowOp.cache || {};	// first call creates new object
	if(!slowOp.cache[x]) {				// not previously called with 'x'
		// do stuff
		p(`new val ${x}`);
	    slowOp.cache[x] = x;			// add new value to cache object
	}
	else {								// else for demo logging only	
		p(`existing ${x}`);
	}
	p(slowOp.cache);
	return slowOp.cache[x] = x;	
}

slowOp(5);
slowOp(5);
slowOp(9);


/////////////////////////// IIFE (for temp variables, Init etc) 

	/* Module behaviour. Useful for initialization code that won't be re-used.  */

(function() {
	const name = 'Block A';
	p(`Hello from ${name}`);
}());	

// ES6 block scope can be better alternative
{
	const name = 'Block B';
	p(`Hello from ${name}`);
}


//////////////////////////// FUNCTIONS THAT REWRITE THEMSELVES

function party(){
	p('Wow this is amazing!');				// runs on FIRST call only
	party = function(){						// re-assign function name
	    p('Been there, got the T-Shirt');	// runs each subsequent call
	}
}

/* Assigning original function to another var BEFORE running MAINTAINS original function
   definition and will not be over-written. */
const beachParty = party;	

//// LAZY DEFINITION PATTERN    !!!! HANDY for one-off initialization code
party.music = 'boom boom';		// will be removed when function is re-defined

p(party.music);		// 'boom boom'	- before first call
party();			// 'Wow this is amazing!'
party();			// 'Been there, got the T-Shirt'	- function has been re-assigned
party();			// 'Been there, got the T-Shirt'
p(party.music);		// undefined 	- removed when function re-assigned

beachParty();		// 'Wow this is amazing!'		- first call
beachParty();		// 'Wow this is amazing!'		- remains as original
p(beachParty.music);// 'boom boom'	- retains original property


//// INIT-TIME BRANCHING

	/* 
		Using Feature Detection on first call, we can re-write 2 versions of the function
		to either utilize the feature, or fallback! 
		Subsequent calls won't have to check for feature.
	*/

function ride(){
    if (window.unicorn) {
        ride = function(){
			// some code that uses the brand new and sparkly unicorn methods
			return 'Riding on a unicorn is the best!';
		}
	} 
	else {
        ride = function(){
        	// some code that uses the older pony methods
        	return 'Riding on a pony is still pretty good';
    	}
    }
    return ride();
}


//////////////////////////// RECURSION

function reRun(x) {
	if(x <= 3) {
		p(x);
		return x;
	}
	else {
		p(x);
		return reRun(x - 1);
	}
}
reRun(5);		// 5	// 4	// 3


////////////////////////////////// CALLBACKS //////////////////

//// EVENT-DRIVEN ASYNC

function wait(msg, callback, seconds) {
	setTimeout(callback, seconds * 1000);	// Async - added to event loop while program continues
	p(msg);
}

function after() {
	p('Timeout callback function');
}

/* !! Even ZERO timer pushes async to top of stack. (not true zero)
	Still has to wait for CURRENT EXECUTION STACK (?limits. function scope??) to complete  */
wait('Call first function', after, 0);		
p('program continues while waiting for timer');


// CALLBACK HELL (& ERROR FIRST CALLBACKS) minimal example		!!! avoid if possible

/*
	login(userName, function(error,user) {
	    if(error) {
	        throw error;
	    } 
	    else {
	        getPlayerInfo(user.id, function(error,info) {
	        	if(error) {
	        		throw error;
		        } 
		        else {
		            loadGame(info, function(error,game) {
		                if(error) {
		        			throw error;
		    			} 
		   				 else {
		    				// code to run game
						}
					}); 
		        }
			}); 
	    }
	});

*/


////////////////////////////// PROMISES


	/* simple explanation - https://kosamari.com/notes/the-promise-of-a-burger-party */

/*
const basicPromise = new Promise( (resolve, reject) => {
	// async operation here - (eg. function(error,info))	// error first??
	if(error) {
		// return reject(result) 							// passed as second arg to .then
		// OR return reject(Error(`blah blah result`));		// passed to .catch instead
	}
	else {
	    // return resolve(result);							// passed as first arg to .then
	}
});
*/

// example
const dice = {
	sides: 6,
	roll() {
		return Math.floor(Math.random() * this.sides) + 1;
	}
}

const roll = new Promise( (resolve, reject) => {	//takes 'executor' function as callback
	let result = dice.roll();
	setTimeout(() => {				// mock Async
		if(result > 1) {
			return resolve(result);	
		}
		else {
			return reject(result);		
		}
	}, 2000);
});


//// DEALING WITH SETTLED PROMISE

	/* 
		.then accepts fulfilment function and rejection function, both with result argument.
		Rejection could also be passed to .catch instead
	*/


/*	Eg. .then(fulfilment, rejection)

roll.then(function(num) {				// longhand function for demo clarity
			p(`You rolled a ${num}`);
		}, 
		function(num) {					
			throw new RangeError(`Uh oh, you rolled a ${num}`);
		}
	);
*/

// clearer approach
roll.then(result => {
	p(`You rolled a ${result}`);
})
.catch(result => {
	throw Error(`Oops you rolled a ${result}`);
});


//// CHAINING MULTIPLE PROMISES

	/* 
		Sequential Async. 
		Each promise will only begin when the previous one has settled 
		Each then returns a new promise - passed as arg to callback
	*/

/*  Replaces demo code from callback hell

	login(userName)
	.then(user => getPlayerInfo(user.id))
	.then(info => loadGame(info))
	.catch( throw error);

*/


///////////////////////////// ASYNC

async function loadGame(userName) {					// function preceded by async keyword to run ASYNC
    try {											// contain errors
    	const user = await login(userName);			// await operator wraps return in promise which is assigned to var
    	const info = await getPlayerInfo (user.id);	// not executed until previous promise fulfilled
    	// load the game using the returned info
    }
    catch (error) {									// handle errors
    	throw error;
    }
}


//////////////////////////// GENERALIZED FUNCS WITH CALLBACKS

/* abstracted functionality */
function random(a, b=1) {
	if(b == 1) {			// if only 1 argument is provided, swap the values of a and b
		[a,b] = [b,a];
	}
	return Math.floor((b-a+1) * Math.random()) + a
}

/* generalize so callback is performed on number before returning */
function random(a, b, callback) {
	if(b == 1) {
		[a,b] = [b,a];
	}
	let result = Math.floor((b-a+1) * Math.random()) + a
	if(callback) {
		result = callback(result);		// apply any function to result!
	}
	return result;
}

p(random(2, 4));						// 2 // 3 // 4 
p(random(2, 4, square));				// 4 // 9 // 16
p(random(2, 4, (n) => 2 * n ));			// 4 // 6 // 8		! inline callback


/////////////////////////// FUNCTIONS THAT RETURN FUNCTIONS

function returnOther() {
	p('Outer call');
	return function() {
		p('Inner func');
	}
}
returnOther();							// 'Outer call'

/* To make use of returned function it has to be assigned to variable. */

const otherRef = returnOther;			// simply references original - not what's needed here
p(otherRef);							// f returnOther{... f(){}}

const innerFunc = returnOther();		// !!CALLED ('Outer call'). THEN references INNER return func
p(innerFunc);							// f () {p('Inner func')}
innerFunc();							// 'Inner func'		!!Invoked INNER

/* practical usage:  */
function greeting(say='hello') {
	return function() {
		p(say);
	}
}

const englishGreeting = greeting();
const frenchGreeting = greeting('bonjour');
const spanishGreeting = greeting('hola');
/*  Beginning to see CLOSURE here. These all return inner function... AND maintain 
	access to 'say' arg (and any other local variables).	

		Return scope:	
		------------------
		| say (call val) |	 
		------------------
		| func(*say*) {} |
		|				 |
		------------------

	To put it another way, local variables are only kept 'alive' while the function is active.
	Then they are removed (cause ReferenceError outside function).
	HOWEVER, because the returned inner function has a reference to it the variable is 
	kept alive and is accessible by (tied to) the (variable assigned to) returned function.
*/

englishGreeting();		// hello
frenchGreeting();		// bonjour
spanishGreeting();		// hola


/////////////////////////////////// CLOSURES

	/* 	See info above  */

function closure() {
	const a = 1.8;
	const b = 32;
	return c => c * a + b;			// return anon func which MAINTAINS access to A and B
}

const toFarenheight = closure();	// can now be invoked with C, while also accessing A and B

p(toFarenheight(30));				// 86
p(toFarenheight(7));				// 44.6

// Closures can also change the variables that they maintain access to
function counter(start) {
	var i = start;
	return () => i++;
}

const count = counter(1);
p(count());					// 1
p(count());					// 2
p(count());					// 3
	

////////////////////////////////// GENERATORS


function* fibonacci(a,b) {
	let [ prev,current ] = [ a,b ];
	while(true) {
	    [prev, current] = [current, prev + current];
	    yield current;
	}
}

const sequence = fibonacci(1,1);

p(sequence.next());
p(sequence.next());
p(sequence.next());


///////////////////////////////// FUNCTIONAL PROGRAMMING ///////////////////

	/*
		"... a program becomes a sequence of expressions based on the return values 
		of pure functions. The emphasis is placed on using function COMPOSITION to 
		combine pure functions together to complete more complex tasks.""
	*/

// Eg.
function hypotonuse(a,b) {
	return Math.sqrt(square(a) + square(b));
}

p(hypotonuse(4,3));						// 5

////////////////// PURE FUNCTIONS

	/*	
		1) The return value of a pure function should only depend on the values provided
		   as arguments. It doesn’t rely on values from somewhere else in the program.
		2) There are no side-effects. A pure function doesn’t change any values or data 
		   elsewhere in the program. It only makes non-destructive data transformations 
		   and returns new values, rather than altering any of the underlying data.
		3) Referential transparency. Given the same arguments, a pure function will 
		   always return the same result.
	*/

// Eg.
const myString = 'hello';
function reverse(str) {
	return str
		.split('')
		.reverse()
		.join('');
}

p(reverse(myString));					// 'olleh'  - !!! making use of return values
p(myString);							// 'hello'  - UNCHANGED by function


//////////////////// HIGHER ORDER FUNCTIONS

	/* use closures within generic function in order to return more specific functions. */

function myMultiplier(x) {
	return function(y) {
		return x * y;
	}
}

const double = myMultiplier(2);		// NB: this is basic example of CURRYING FUNCTION
const triple = myMultiplier(3);
p(double(5));						// 10
p(triple(5));						// 15

p(myMultiplier(3)(2));	// !!'multiplier(3)'returns function which can be immediately invoked. (2)


//////////////////// CURRYING
	
	/* partial application of higher order functions. Relies on closure. */

function oldMultiplier(a, b) {		// simple old school
	return a * b;
}

function multiplier(a, b) {
	if(b === undefined) {		// allows currying if only one arg supplied
		return function(c) {
			return a * c
		}
	}
	return a * b;
}

p(multiplier(.22, 350));		// 77	- generic usage. 2 args
const tax = multiplier(.22);	// CURRIED. Create reusable function with arg trapped by closure
p(tax(350));					// 77	



})();