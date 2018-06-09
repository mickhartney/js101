(function() {
//////////////////////////////// OBJECT-ORIENTED JAVASCRIPT ///////////////


// Encapsulation: keep all logic inside object and only make essential methods available
// Polymorphism: ability to use shared methods but also provide over-ride with more specific implementation
// Inheritance: inherit from existing object and also add new props/methods


////////////////////////// CONSTRUCTORS (legacy!!)

const Dice = function(sides=6) {
	this.sides = sides,
	this.roll = function() {
		p(Math.ceil(Math.random() * this.sides));
	}
};

const redDice = new Dice;
const blueDice = new Dice(3);

redDice.roll();
blueDice.roll();

p(redDice instanceof Dice);			// true


////////////////////////// ES6 CLASS (implicit strict mode. invocation warnings for no 'new' etc)

class Vehicle {
	constructor(wheels=4) {
		this.wheels = wheels;
	} 

	go() {
		p(`Vroom vroom: ${this.wheels} wheels`);
	}

	static description() {					// can't be called by an instance!
    	p('describe the class itself');
    }
}

const Bike = new Vehicle(2);
Bike.go();

//Bike.description();						// Error. static method!		
Vehicle.description();


///////////////////////// PROTOTYPAL INHERITANCE (PREFER COMPOSITION)

class Jedi {
	constructor(name, weapon, force='good') {
		this.name = name;
		this.weapon = weapon;
		this.force = force;
	}

	saber() {
		return 'shzzoom';
	}
}

const yoda = new Jedi('yoda', 'lightsaber');
p(yoda.force);									// good
p(yoda.saber());								// shzzoom

p(Jedi.prototype);								// {}

Jedi.prototype.weapon = 'fist';
p(yoda.weapon);									// lightsaber - own property over-rides proto

Jedi.prototype.attack = function() {
	return `Cop this ${this.weapon} scum`;
}
p(yoda.attack());								// Cop this lightaber scum  (uses INSTANCE weapon)

yoda.constructor.prototype;						// old school

p(Object.getPrototypeOf(yoda));					// {..}
p(Jedi.prototype.isPrototypeOf(yoda));			// true
p(yoda.hasOwnProperty('force'));				// true - cconstructor prop is own
p(yoda.hasOwnProperty('attack'));				// false - inherited from prototype

/* NB: Each instance has it's own props/methods (duplicated!) from constructor.
	   Prototype props/methods only exist in ONE location in memory but can still be accessed
	   by all instances.
*/


///////////////////////////// PUBLIC v PRIVATE METHODS 

yoda.saber = 'gone!';
p(yoda.saber);									// gone! - over-riden due to public access

class Turtle {
	constructor(name, food='pizza') {
		this.name = name;
		let _food = food;						// let & underscore to mark as private const
        this.getFood = () => _food;
        this.setFood = (food) => {
			if(typeof food === 'string') {		// control assignment
			    return _food = food;
		    } else {
		    	throw new Error('Food must be a string');
			} 
		}
	}

	eat() {
		return `gobble ${this._food}`;
	}
}

const leo = new Turtle('leo');
leo._food = 'hamburger';
p(leo._food);							// hamburger! - Can still be changed?!!
p(leo.getFood());						// pizza!! - initial val maintained by closure!
//leo.setFood(123);						// returns Error
leo.setFood('pasta');
p(leo.getFood());						// pasta


// Enumerables (will appear in a for-in loop)
p(leo.propertyIsEnumerable('name'));					// true
p(Jedi.prototype.propertyIsEnumerable('attack'));		// true
p(Object.prototype.propertyIsEnumerable('toString'));	// false


///////////////////////////// EXTENDS (SUB-CLASS)

class SpecialTurtle extends Turtle {
	constructor(color) {
		super();					// required to access 'this' and parent props
		this.color = color;
	}
	says() {
		p(`Hello, I'm ${this.color}`);
	}
}

const timmy = new SpecialTurtle('orange')
timmy.says();								// Hello, I'm orange
p(timmy.getFood());							// pizza (new instance has not over-ridden val)


///////////////////////////// POLYMORPHISM

// Blah blah blah - allows methods to be over-ridden with more specific implementation


////// MONKEY PATCHING

/* In theory you can over-ride methods on built in objects (i.e. customize toString), 
	but this is not good practice. Instead you could create subClass like so:
*/

class MyArray extends Array {
	constructor(...args) {
		super(...args);
	}

	last() {
		//return this.pop();
		return this[this.length - 1];
	}
}

p(new MyArray(1,2,3).last());


////////////////////////////// PROPERTY DESCRIPTORS 


Object.getOwnPropertyDescriptor(yoda, 'force');	
/* 
{ value: 'good',
writable: true,
enumerable: true,
configurable: true }
*/

///////// DEFINE PROPERTY (more configurable assignment)

Object.defineProperty(yoda, 'color', {
	value: 'green', 
	writable: false, 
	enumerable: true, 
	//configurable: false		// can leave attributes out and they will inherit default
});

yoda.color = 'red';				// blocked
p(yoda.color);	// green


//////// GETTERS & SETTERS (instead of value)

	/*  All objects must have a value OR get()) and set() methods. They can't have both.
		Useful for properties whose value relies on another property. 
		Also very useful for setting within a Class. 
		Beware that this will cause unexpected behaviour by not allowing normal assignment. */

const me = {
	age: 21,
	retirementAge: 65,
}

Object.defineProperty(me, 'yearsToRetirement',{
	get() {
		if(this.age > this.retirementAge) { 
			return 0; 
		}
		else { 
			return this.retirementAge - this.age; 
		}
	},
	set(value) {
		this.age = this.retirementAge - value;
		return value;
	}
});

p(me.yearsToRetirement);		// 44	
me.yearsToRetirement = 40;		// sets age (calc)
p(me.age);						// 25


////////////////////////// CREATING OBJECTS FROM OTHER OBJECTS !!!!!

	/* INVESTIGATE FURTHER. This approach is recommended over classical/prototypal inheritance?? */

// base
const Human = {
	arms: 2,
	legs: 2,
	walk() { 
		console.log('Walking'); 
	}
}

const dude = Object.create(Human);
p(dude.arms);							// 2

p(dude);								// {} empty
dude.name = 'bob';
p(dude);								// {name: 'bob'}  
p(dude.__proto__);						// {arms: 2, legs: 2, walk: f()}
p(Human.isPrototypeOf(dude));			// true
p(dude.hasOwnProperty('name'));			// true
p(dude.hasOwnProperty('arms'));			// false
p(dude.propertyIsEnumerable('arms'));	// false

//Human.prototype.eat = 'cake';	// Error! ONLY EXISTS ON CLASSES/CONSTRUCTORS. NO NEED??
p(Human.prototype);				// undefined! 
// p(dude instanceof Human);	// Error. ONLY EXISTS ON CLASSES/CONSTRUCTORS, not Object.create
p(leo instanceof Turtle);		// true (Class/instance)


/////////////////////// OBJECT ASSIGN 

const a = {};
const b = { name: 'JavaScript' };
Object.assign(a,b);
p(a.name);					// JavaScript

const c = {
	pets: {
		dogs: ['rex', 'fido']
	}
}

Object.assign(a, c);		// WARNING - shallow assignment only!!!
p(a)						// {name: 'JavaScript', pets: {...}}

a.pets.dogs = ['bob'];		// over-rides c.pets.dogs as this is copied by reference only!!!!
p(c.pets);	


///// MIXINS - investigate further. Good practice? FB/react seems to discourage


///// BORROW METHODS (useful for avoiding large-scale inheritance?)

/* Eg:

const fly = superman.fly;
fly.call(batman)

*/



})();