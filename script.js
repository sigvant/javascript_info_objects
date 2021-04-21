// what is the result of accessing its ref? why?
// Here the function makeUser returns an object

function makeUser() {
	return {
		name: "John",
		ref: this
	};
}
let user = makeUser();

alert( user.ref.name ); //what's the result?

// it will result a typeError. That's because rules that set this do not look at object definition
// only the moment of call matters.

// Here the value of this inside makeUser() is undefined, because it is called as a function, not
// as a method with the dot syntax. the value of this is one for the whole function, code blocks
// and object literals do not affect it.

// So ref: this actually takes current this of the function.

// We can rewrite the function and return the same this with undefined value:

function makeUser(){
	return this; //this time there's no object literak
}

alert( makeUser().name );

//as you can see the result of alert( makeUser().name ) is the same as the result of alert( 
// user.ref.name ) from the previous example.

here is the opposite case:

function makeUser(){
	return {
		name: "John",
		ref() {
			return this;
		}
	};
}

let user = makeUser();
alert( user.ref().name ); //John

// now it works because user.ref() is a method. And the value of 'this' is set to the object
// before dot .

// Create an object calculator with three methods:

// * read() prompts for two values and saves them as object properties.
// * sum() returns the sum of saved values
// * mul() multiplies saved values and returns the result.

let calculator = {
	sum() {
		return this.a + this.b;
	},

	mul() {
		return this.a * this.b;
	},

	read() {
		this.a = +prompt('a?', 0);
		this.b = +prompt('b?', 0);
	}
};

calculator.read();
alert( calculator.sum() );
alert( calculator.mul() );

// Chaining - there's a ladder object that allows to go up and down:

let ladder = {
	step: 0,
	up() {
		this.step++;
	},
	down() {
		this.step--;
	},
	showStep: function() {
		alert( this.step );
	}
};

// if we need to do several calls in sequence, can do it like this:

ladder.up();
ladder.up();
ladder.down();
ladder.showStep(); //1

// modify the code if up, down and showStep to make the calls chainable, like this:

ladder.up().up().down().showStep(); //1

// Such approach is widely used accross javascript libraries.

let ladder = {
	step: 0,
	up() {
		this.step++;
		return this;
		
	},
	down() {
		this.step--;
		return this;
		
	},
	showStep: function() {
		alert( this.step );
		return this;
	}
};


// Two Functions - One object
// Is it possible to create functions A and B such as 'new A() == new B()'?

function A() {...}
function B() {...}

let a = new A;
let b = new B;

alert( a == b );

//it is possible, if the functions return objects like this:

let obj = {};

function A() {return obj;}
function B() {return obj;}

alert( new A() == new B());

//Create New Calculator

//Create a constructor function Calculator that creates objects with 3 methods:

//* read(), sum() and mul() - from the exercise before.

For instance: let calculator = new Calculator();
calculator.read();

alert("Sum=" + calculator.sum());
alert("Mul=" + calculator.mul());

//

function Calculator() {
	this.sum = function() {
		return this.a + this.b;
	};

	this.mul = function() {
		return this.a * this.b;
	};

	this.read = function() {
		this.a = +prompt('a?', 0);
		this.b = +prompt('b?', 0);
	};
};


let calculator = new Calculator();

calculator.read();

alert("Sum=" + calculator.sum());
alert("Mul=" + calculator.mul());

// optional solution:

function Calculator() {

	this.read = function() {
		this.a = +prompt('a?', 0);
		this.b = +prompt('b?', 0);
	};

	this.sum = function() {
		return this.a + this.b;
	};

	this.mul = function() {
		return this.a * this.b;
	};
}

let calculator = new Calculator();
calculator.read();

alert( "Sum=" + calculator.sum());
alert( "Mul=" + calculator.mul());

//CREATE NEW ACCUMULATOR

// Create a constructor function Accumulator(startingValue).

// Object that it creates should:

// * Store the 'current value' in the property 'value'. The starting value is set to the argument
// of the cosntructor 'startingValue'
// * the read() method should use prompt to read a new number and add it to 'value'

// In other words, the 'value' property is the sum of all user-entered values with the initial
// value of 'startingValue'.

function Accumulator(startingValue) {

	this.value = startingValue;

	this.read = function() {
		this.a = +prompt("Type a natural number", 0);
		this.value += this.a
	};

	this.show = function() {
		return this.value
	};
};

let accumulator = new Accumulator(1);

accumulator.read();
accumulator.read();

alert(accumulator.value);
