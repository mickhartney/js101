(function() {
/////////////////////////////////  STRINGS  /////////////////////////////////////

let str = 'Hello World';

str.toUpperCase();		
p(str);						// !! unchanged - assign to another var or log/pass expr

p(str.toUpperCase());		// HELLO WORLD
p(str.toLowerCase());		// hello world

p(str.charAt(4));			// 'o'

p(str.indexOf('f'));		// -1
p(str.indexOf('l'));		// 2
p(str.lastIndexOf('l'));	// 9

p(str.includes('h'));		// false
p(str.includes('Hello'));	// true

let otherStr = '!!!';
p(str.concat(otherStr));	// Hello World !!!
p(str + otherStr);			// works if both strings - Type check!!
p('test' + 5);				// 'test5'

p('  trimmed  '.trim());	// 'trimmed'

p(String(52));				// '52'

// ES6
p(str.startsWith('h'));		// false
p(str.startsWith('H'));		// true
p(str.endsWith('o'));		// false
p(str.endsWith('d'));		// true
p('Allo '.repeat(2));		// Allo Allo 


//////////////////////////////////// NUMBERS ////////////////////////////////////////

let num = 5;
p(num++);					// 5 // returns THEN increase
p(num);						// 6
num = 5;			 		// reset for demo
p(++num);					// 6 // increases THEN returns

// Number to String
p(num.toString());			// '6'

p(3.14159.toFixed(3));		// '3.142' (!! string) - ROUNDS to number of decimal places
p(3.24643.toPrecision(3));	// '3.25' (!! string) - ROUNDS to number of figures

// String to Number
p(Number('432'));			// 432 

p(parseInt('32'));			// 32 - i.e ('32', 10) - default base 10
p(parseInt('27b', 10));		// 27
p(parseInt('3.14'));		// 3
p(parseInt('2.9'));			// 2 - stripped NOT rounded
p(parseInt('32', 16));		// 50 - base 16, HEX

p(parseFloat('4.56'));		// 4.56

// Syntax gotcha!!
// 542.toFixed(3);			// !!! ERROR - interprets dot operater as decimal
// Alternatives
p(num.toExponential());		
p(5.0.toExponential());
p(5 .toExponential());
p(5..toExponential());
p((5).toExponential());

p(Number.isInteger(42));	// true	
p(Number.isInteger(3.14));	// false

p(Number.isFinite(42));		// true
p(Number.isFinite(1/0));	// false

p('test' * 5);				// Nan
p(isNaN(5));				// false
p(isNaN('abc'));			// true

p(10 + null);				// 10 - null interpreted as zero
p(10 + undefined);			// NaN 


////////////////////////////////////// BOOLEAN /////////////////////////////////////

p(Boolean('test'));			// true
p(Boolean(43));				// true

p(Boolean(0));				// false
p(Boolean(''));				// false
p(Boolean(NaN));			// false
p(Boolean(false));			// false
p(Boolean(null));			// false
p(Boolean(undefined));		// false


///////////////////////////////////// OPERATORS ////////////////////////////////////

///////           &&  (LAST truthy or FIRST falsey)

p('truthy' && true && 24); 			// returns 24 - returns LAST truthy value if ALL true
p('truthy' && 0 && undefined);		// !! returns 0 - returns FIRST falsey value 

p(Boolean('truthy' && 24)); 		// returns true
p(!!('truthy' && 0));				// returns false

///////           ||  (FIRST truthy or LAST falsey)

p('truthy' || 24 || true);			// returns 'truthy' - returns FIRST truthy value 
p(undefined || '' || 0);			// !! returns 0 - returns LAST falsey value if ALL false

p(Boolean('truthy' || 24)); 		// returns true
p(Boolean(undefined || 0)); 		// returns false	

// Assignment
let a = 0;

false && (a=1);			
p(a);					// 0
false || (a=1);
p(a);					// 1


///////////////////////////////////// COMPARISON ///////////////////////////////////

// Equality (quirks)
p('0' == true);			// false  (0: false, 1: true). Coerced to number 0
p('1' == true);			// true  (0: false, 1: true)

p('2' == true);			// !! false. TRUTHY but not TRUE
p(!!'2');				// true (truthy check only)
p('true' == true);		// false. String is truthy but not true

p(0 == false);			// true
p('' == false);			// true
p(' ' == false);		// true
p(undefined == false);	// !! false
p(null == false);		// !! false
p(NaN == false);		// !! false
p(!undefined);			// !! true
p(!null);				// !! true
p(!NaN);				// !! true

p(null == undefined);	// true
p(null === undefined);	// false

p(NaN === NaN);			// false - seperate instances of jibberish

p(isNaN(5));			// false
p(isNaN('xyz'));		// !! true - Strings are NaN (pre ES6 method)
p(isNaN(NaN));			// true

//ES6 Number method (i.e not global)
p(Number.isNaN(NaN));	// true  
p(Number.isNaN('5'));	// false
p(Number.isNaN('xyz')); // !! false - specifically checking for 'NaN'. Strings are not NaN (ES6)

p(8 == '8');			// true
p(8 === '8');			// false
p(8 >= 8);				// true
p(8 >= '8');			// true - coerced

//Hard check hack  (no such operator as >==)
p(8 > 8 || 8 === 8);	// true
p(8 > 8 || 8 === '8'); 	// false

// ABC... abc...
p('A' < 'B');	// true
p('A' < 'a');	// true



///////////////////////////////////// CONTROL ETC //////////////////////////////////

// Ternary assignment
let n = 5;
let q = n = 5? 'isTrue': 'isFalse';		// !!!! WARNING assigns n also
p(n);									// 'isTrue'
p(q);									// 'isTrue'

q = (n = 5)? 'isTrue': 'isFalse';		// Wrap condition in brackets
p(q);									// 'isTrue'
p(n);									// 5

p(`Ternary in template string. Cond: number ${n} ${n%2 === 0? 'isEven' : 'isOdd'}`);

// Switch
let x = 3;
switch (x) {
	case 3: 
		p('num is 3');
		break;
	case 5: 
		p('num is 5');
		break;
	default: 
		p('num is ?');
		break;
}


////////////////////////////// LOOPS

// While
let bottles = 3;
while(bottles > 0) {
	p(`${bottles} bottles`);
	bottles--;					// !!! Important. avoid endless loop
}

let beers = 3;			
while(--beers) {				// Decrement THEN run (i.e. Alt: 2 beers \n Alt: 1 beers)
	p(`Alt: ${beers} beers`);
}

// Do... while
do {
	p(`${beers} more beers`);
	beers++;
} while(beers <= 3);


// For
for(let i = 0; i <= 3; i++) {
	p(`for ${i}`);
}

// Loop over array
let dogs = ['rex', 'spot', 'fido'];
for(let i = 0, l = dogs.length; i < l; i++) {	// assign array length to var for performance
	p(dogs[i]);
}

for(const val of dogs) {						// ES6      !!!!! Must be Const !!!!!!!
	p(val);
}

// Loop over Sets and Maps

	/* NB: Weak sets and maps are non-enumerable so can't use these methods */

let cats = new Set(['mittens', 'fluffy']);
for(const val of cats) {
	p(val);
}

let testMap = new Map();
testMap.set('a', 'bird').set('b', 'tree');		// could also init with nested array

for(const key of testMap.keys()) {
	p(key);
}

for(const val of testMap.values()) {
	p(val);
}

for(const [key,val] of testMap.entries()) {
	p(`Key: ${key} \n Val: ${val}`);
}


})();
