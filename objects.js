(function() {
///////////////////////////////// OBJECTS ////////////////////////////////////


///////////////////////////// Creation

const empty = {};

const obj = {
	name: 'jim',
	age: 24
}

obj.surname = 'jones';
p(obj);										// {name: 'jim', age: 24, surname: 'jones'}

// ES6 shorthand (using existing variables)
const name = 'bob',
	  age = 35;

const dude = {name, age};
p(dude);									// {name: 'bob', age: 35}

// add/remove
dude.says = () => p('hey bro');
dude.says();								// 'hey bro'
delete dude.age;
p(dude);									// {name: 'bob', says: f{..}}


///////////////////////////// Property access 

p(dude.name);								// 'bob'
p(dude['age']);								// 35
p(dude['real ' + 'name']);					// undefined	- brackets can evaluate expression for key


// Computed properties (ES6)

 const cat = {name: 'fiddles', ['fav' + '_food']: 'mice'};
 p(cat);									// {name: 'fiddles', fav_food: 'mice'}

const hero = true;
const superman = {
	name: 'clark', 
	isHero: hero ? true: false,				// property val can be expression
	fly() {									// ES6 method shorthand
		p('Up up and away');		
	}
};	

p(superman.isHero);							// true
superman.fly();								// 'Up up and away'


////////////////////////// Check properties/methods

p('city' in superman);						// false			!!! Checks INHERITED props also
p(superman.job !== undefined);				// false			!!! Checks INHERITED props also
p(superman.hasOwnProperty('name'));			// true				Only checks THIS object


/////// Find all properties
p('bbbbbbb');
for(const key in superman) {
	if(superman.hasOwnProperty(key)) {					// Explicitly avoid inherited props
		p(`name: ${key} , value: ${superman[key]}`);
	}
}

// Only THIS object
for(const key of Object.keys(superman)) {
	p(key);
}

for(const val of Object.values(superman)) {			// ES2017 (browser support?)
	p(val);
}

for(const entries of Object.entries(superman)) {	// returns array pairs
	p(entries);										// ['name', 'clark'], ['isHero', true]...
}

for(const [key, val] of Object.entries(superman)) {	// Destructured
	p(`${key}: ${val}`);
}


//////// Nested Objects

const dogs = {
	fido: {
		color: 'black',
		age: 7
	},
	barkley: {
		color: 'brown',
		age: 3
	}
}
p(dogs.fido.color);							// 'black'


//////// Objects are assigned by REFERENCE (not by VALUE)

const imposter = superman;					// !!!! points to SAME object
p(imposter);								// {name: 'superman', isHero: true ..}
imposter.name = 'Lex Luthor';				
p(superman.name);							// 'Lex Luthor'			!! changed original object

// primitives assigned by VALUE
 let a = 5;
 let b = a;									// b is equal VALUE to a
 b = 8;										// change b
 p(a);										// 5		!! a is not affected
 p(b);										// 8

// copy/merge with SPREAD
const obj1 = { foo: 'bar', x: 42 };
const obj2 = { foo: 'baz', y: 13 };
const clonedObj = { ...obj1 };			
p(clonedObj);							// {foo: "bar", x: 42}

const mergedObj = { ...obj1, ...obj2 };		
p(mergedObj);							// {foo: "baz", x: 42, y: 13}


/////// Objects as parameters

function greet({say = 'hello', name}) {
	p(`${say} there ${name}`);
}

greet({name: 'john'});						// hello there john


/////// THIS in Objects

const dice = {
	sides: 6,
	roll() {
		p(Math.floor(this.sides * Math.random() + 1));
	}
}

dice.roll();


///////////////////////////////////// JSON //////////////////////////////

	/* NB: property names must have double quotes. Values can't be functions or evaluations. */

const batman = '{"name": "Bruce Wayne", "good guy": true, "allies": ["Robin", "Batgirl"]}';

// take string and return Object
const batObject = JSON.parse(batman);
p(batObject);

// take object and return string
const batString = JSON.stringify(batObject); 	// also JSON.stringify(obj, [null, ' ']) for line breaks 
p(batString);									// in browser key/val pair display


////////////////////////////////////// MATH /////////////////////////////

// Constants (always uppercase)		-  other constants are available but not commonly used
p(Math.PI);						// 3.1415...
p(Math.SQRT2);					// 1.4142...  square root of 2

// Methods
p(Math.abs(-4.3));				// 4.3
p(Math.ceil(4.3));				// 5
p(Math.floor(6.3));				// 6
p(Math.floor(-6.3));			// -7	!! careful with negs
p(Math.round(7.5));				// 8
p(Math.trunc(9.3));				// 9	removes decimal places. Safer than floor (neg vals)?

//p(Math.exp(1));					// 2.718... Eulers constant
//p(Math.exp(0));					// 1	any number to power of 0 is 1
p(Math.pow(3,2));				// 9	(3 squared)
p(Math.pow(3,3));				// 27 
p(Math.sqrt(121));				// 11
p(Math.cbrt(8));				// 2	// ES6.  2 * 2 * 2
p(Math.hypot(3, 4));			// 5	// ES6
// Math.log(1);					// 0	etc etc

p(Math.max(1,2,3));				// 3
p(Math.min(1,2,3));				// 1

/* Trigonometry
Math.sin();
Math.cos();
Math.tan();
Math.asin();
Math.acos();
Math.atan();
Math.sinh();
Math.asinh();
Math.cosh();
*/

p(Math.random());					// 0 - .9999
p(Math.random() * 5);				// 0 - 4.999
p(Math.floor(Math.random() *3) + 1);// 1 - 3


//////////////////////////////////////// DATE //////////////////////////////

// constructor
const today = new Date();					// constructor with default NOW
p(today.toString());						// eg. 'Mon Feb 19 2018...'

const xmas = new Date('2018 12 25');		// pass in a date (various formats)
p(xmas.toString());							// is toString necessary??

// Getter methods 			(most have 2 variations - local and UTC)
p(xmas.getDay());					// 2 		(0 = sunday, 1 = monday...)
p(xmas.getDate());					// 25
p(xmas.getMonth());					// 11		(0 = jan..)
p(xmas.getYear());					// 118		!!!! broken for years after 2000
p(xmas.getFullYear());				// 2018 	use this method instead

p(xmas.getTime());					// number of milliseconds since 'Epoch'. (i.e 1 Jan 1970)
const xmasEve = new Date(xmas.getTime() - 1000 * 60 * 60 * 24);
p(xmasEve.toString());				// Mon Dec 24.....

p(Date.now());						// number of milliseconds since 'Epoch'. (i.e 1 Jan 1970)


p(new Date().getTimezoneOffset());	// mins between local time and UTC

// Setter methods
xmas.setDate(1);
xmas.setMonth(3);
xmas.setYear(1975);
p(xmas);							// 'Tue Apr 01 1975...'

	/* Also setHours(), setUTCHours(), setMinutes(), setUTCMinutes(), 
	   setSeconds(), setUTCSeconds, setMilliseconds() and setUTCMilliseconds() */

	/* See moment.js for working with times and dates UTC */


///////////////////////////////////////// RegExp ///////////////////////////////////

const pattern1 = /[a-zA-Z]+ing$/;				// literal
const pattern2 = new RegExp('[a-zA-Z]+ing');	// constructor

const language = 'JavaScript';
const pattern3 = new RegExp(language);			// accept variable, user input eg
p(pattern3);									//	/JavaScript/

p(pattern1.test('joke'));						// false
p(pattern1.test('joking'));						// true
p(pattern1.test('jokingly'));					// false

p(pattern1.exec('joking'));						// [ 'joking', index: 0, input: 'joking' ]

})();