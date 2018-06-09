(function() {
///////////////////////////////// ARRAYS ////////////////////////////////////////////////

let ObjArr = new Array(5);		// Not really good practice to use constructor

let arr = [];
arr[0] = 'cat';
arr[1] = 'dog';
arr[2] = 5;
p(arr);					// ['cat', 'dog', 5]

delete arr[2];
p(arr);					// ['cat', 'dog' undefined] - index NOT completely removed

arr = ['cow', 'pig'];		
p(arr);					// ['cow', 'pig']


//////////////////////////////// DESTRUCTURING ////////////////////////

let [a, b] = arr;		// as above ['cow','pig']
p(a);					// 'cow'
p(b);					// 'pig'

let [x, y] = [1,2];
p(x);					// 1
p(y);					// 2

// Allows value swap without temp y (pre ES6)
[x,y] = [y,x];
p(x);					// 2
p(y);					// 1


//////////////////////////////// SPREAD OPERATOR /////////////////////

p('spread');
p(arr);					// ['cow', 'pig']
p(...arr);				// cow pig 
p(...arr[0]);			// c o w

// examples
function myFunction(x, y, z) { 
	p(`x: ${x}, y: ${y}, z: ${z}`);
}
const args = [0, 1, 2];
myFunction(args);				// x: 0,1,2, y: undefined, z: undefined		(args = x)
myFunction.apply(null, args);	// x: 0, y: 1, z: 2			Old school
myFunction(...args);			// x: 0, y: 1, z: 2			(array is split)

const parts = ['shoulders', 'knees']; 
const lyrics = ['head', ...parts, 'and', 'toes'];
p(lyrics);								// ['head', shoulders, knees, 'and', 'toes']	


//////////////////////////////// PROPERTIES & METHODS /////////////////

arr.length = 3;			
p(arr);					// ['cow', 'pig', empty]

arr.length = 1;
p(arr);					// ['cow']


p(arr.push('pig'));		// 2 - returns length!!!
p(arr);					// ['cow','pig']

p(arr.unshift('dog'));	// 3 - returns length!!!
p(arr);					// ['dog', 'cow', 'pig']

p(arr.shift());			// 'dog'
p(arr);					// ['cow','pig']

p(arr.pop());			// 'pig'
p(arr);					// ['cow']


///////////  Merge/join

p(arr.concat(['duck', 'goat']));	// ['cow', 'duck', 'goat']
p(arr);								// ['cow']  						Original NOT changed!!

// Assign
arr = arr.concat(['duck', 'goat']);	
p(arr);								// ['cow', 'duck', 'goat']			Original IS re-assigned

// Spread assign
arr = [...arr, ...['cat', 'dog']];
p(arr);					// ['cow', 'duck', 'goat', 'cat', 'dog']		Original IS changed!!

p(arr.join());			// 'cow,duck,goat,cat,dog'
p(arr.join('|'));		// 'cow|duck|goat|cat|dog'
p(arr);					// ['cow', 'duck', 'goat', 'cat', 'dog']		Original NOT changed!!


///////////  SLICE (start index, to (NOT INCLUDING) end index)

p(arr.slice(2,4));		// ['goat', 'cat']  - returns sliced items 
p(arr);					// ['cow', 'duck', 'goat', 'cat', 'dog']  		Original NOT changed!!


///////////   SPLICE (start index, num items, [insert vals,,]) 

p(arr.splice(2,2, 'fish')); 	// ['goat', 'cat']  - returns spliced items 
p(arr);							// ['cow', 'duck', 'fish', 'dog']		Original IS changed!!

// Specify insert
p(arr.splice(1,0, 'sheep'));	// []
p(arr);							// ['cow', 'sheep', duck', 'fish', 'dog']	

// Specify remove
p(arr.splice(2,2));				// [duck', 'fish',]
p(arr);							// ['cow', 'sheep', 'dog']


///////////   SORT   Alphabetical default for strings, numbers by FIRST digit, can take callback func

p(arr.sort());					// ['cow', 'dog', sheep']  
p(arr);							// ['cow', 'dog', sheep']				Original IS changed!!
p([5,9,10].sort());				// [10, 5, 9]


p(arr.reverse());				// ['sheep', 'dog', cow']
p(arr);							// ['sheep', 'dog', cow']				Original IS changed!!


///////////    Find

p(arr.indexOf('cow'));			// 2
p(arr.indexOf('co'));			// -1

p(arr.includes('sheep'));		// true		ES6
p(arr.includes('goat'));		// false


///////////	   Multidimensional arrays

let multi = [[3,5],[8,2], ['cat','dog']];
p(multi[0][1]);					// 5


let summer = ['Dec', 'Jan', 'Feb'];
let winter = ['Jun', 'Jul', 'Aug'];
let mix = [summer, winter];
p(mix);							// [['Dec', 'Jan', 'Feb'], ['Jun', 'Jul', 'Aug']];

// Spread to flatten
let flat = [...summer, ...winter];
p(flat);						// ['Dec', 'Jan', 'Feb', 'Jun', 'Jul', 'Aug'];


//////////////////////////////////// SETS (ES6) ///////////////////////////////

let list = new Set();				// currently no literal syntax creation

p(list.add('red').add('blue'));		// Set(2) {'red', 'blue'}
p(list.add('red'));					// Set(2) {'red', 'blue'}		Ignored. NO DUPLICATES

let nums = new Set([1,2,3,3,3,3]);
p(nums);							// Set(3) {1,2,3}

let letters = new Set('hello');
p(letters);							// Set(4) {'h','e','l','o'}

let words = new Set('a').add('few').add('words');
p(words);							// Set(3) {'a','few','words'}

let mixed = new Set([2, '2']);
p(mixed);							// Set(2) {2, '2'}		No type coercion!!


////////// Set Methods 

p(list.size);						// 2

p(list.has('red'));					// true				Faster method than includes() or indexOf()		
p(list.has('green'));				// false				

p(list[0]);							// undefined  		Sets don't have index notation

p(words.delete('words'));			// true (was able to delete)
p(words);							// Set(2) {'a', 'few'}
p(words.delete('more'));			// false (not found in set)
p(words);							// Set(2) {'a', 'few'}
p(words.clear());					// undefined
p(words);							// Set(0) {}


// Convert Set to Array 

// spread
let listArr = [...list];
p(listArr);							// ['red', 'blue']

// alternative
let lettersArr = Array.from(letters);
p(lettersArr);						// ['h', 'e', 'l', 'o']


/////////// New Array with duplicates removed				

let dupes = [1,1,1,2,3,3,3,4,5,5,5];
let noDupes = [...new Set(dupes)];	
p(noDupes);							// [1,2,3,4,5]		PRETTY HANDY!!!

////////// Weak Sets

/* Used for sets containing non-primitive values ONLY. Unlike normal sets these will garbage collect
   references to removed objects. Useful for memory optimization. */

let weak = new WeakSet();
weak.add(noDupes);				
p(weak);							// WeakSet {Array(5)}	Return values are sketchy - weak ref to object
p(weak.has(noDupes));				// true
p(weak.delete(noDupes));			// true
p(weak.has(noDupes));				// false


//////////////////////////////////////// MAPS ///////////////////////////////////

/* Similar to objects except purely for getting/setting KEY-VALUE pairs:
	# can have any data type as key name (objects only have string)
	# unlike objects can easily find number of key-val pairs using 'size' property
	# no object methods or inheritance
	# must use get() to retreive vals (no map.keyName for example)
*/

let roman = new Map();				// currently no literal syntax creation

roman.set(1, 'I');
p(roman);							// Map(1) {1 => 'I'}		'hash rocket' symbol (=>)

p(roman.set(2, 'II').set(3, 'III'));// Map(3) {1 => 'I', 2 => 'II', 3 => 'III'}

// Alternative init with nested arrays
let heroes = new Map([['clark kent', 'superman'], ['bruce wayne', 'batman']]);
p(heroes);


////////// Map Methods

p(heroes.get('bruce wayne'));		// batman
p(heroes.has('clark kent'));		// true
p(heroes.size);						// 2
p(heroes.delete('bruce wayne'));	// true
p(heroes.size);						// 1
p(heroes.clear());					// undefined
p(heroes.size)						// 0


//////////// Converting Maps to (nested) Arrays

// spread
let romanArr = [...roman];
p(romanArr);						// [[1, 'I'],[2, 'II'],[3, 'III']]
p(romanArr[1][1]);					// 'II'

// Array.from()
let otherRomanArr = Array.from(roman);
p(otherRomanArr);					// [[1, 'I'],[2, 'II'],[3, 'III']]


///////// WeakMap

let weakMap = new WeakMap();		// similar to WeakSet. Keys can't be primitive



////////////////////////////////////// ARRAY ITERATORS!!!!!! /////////////////////////////////

const loopArr = [1,2,3,4];


/////////////////////// FOREACH			    	(Simple loop. action within body)

	// Usage: forEach( (value, [index], [thisArray]) => {} );		

loopArr.forEach(function(v, i, a) {			
	p(`Index ${i}: ${v}`);
	//a[i] = v * 2;								// Amend original for eg 
	//targetArr[i] = v * 2;						// Old school map to new
});



/////////////////////// MAP 					(Returns NEW ARRAY!!)

	// Usage: arr.map( (value, [index], [thisArray]) => {} );		

const doubleArr = loopArr.map(function(v) {	
	return v + v;
});	
p(doubleArr);									// [2,4,6,8]

const square = x => x * x;
p(loopArr.map(square));							// [1,4,9,16] can take declared func as callback



/////////////////////// REDUCE					(Combine results and return SINGLE value)

	// Usage: arr.reduce( (accumulatedVal, currentVal) => {}, [initialAccVal] );

p(loopArr.reduce( (acc, cur) => acc + cur ));	// 10

const fiftyPlus = loopArr.reduce(function(acc, cur) {
	return acc + cur;
}, 50);

p(fiftyPlus);									// 60 (50 + array accumulation)



//////////////////////// FILTER					(Returns NEW ARRAY of values that return true)

	// Usage: arr.filter( val => {true?} );

const isEven = loopArr.filter(function(v) {
	return v % 2 === 0;
});

p(isEven);										// [2,4]



///////////// Chaining Iterators

let chainVal = loopArr.map( (v, i) => v * 2).filter( v => v % 4 === 0).reduce( (acc, curr) => acc + curr);
p(chainVal);		// 12  		i.e. [2,4,6,8] > [4,8] > 12



/////////////////////// OTHER ARRAY ITERATORS

	// EVERY, FIND, SOME, REDUCERIGHT

	// To do



})();