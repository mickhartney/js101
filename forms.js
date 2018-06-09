(function() {
///////////////////////////////// FORMS ////////////////////////////////////

//////// FORM ACCESS

p(document.forms);								// legacy DOM - HTML Collection of ALL forms on page
p(document.forms[0]);							// requires index to access
p(document.getElementsByTagName('form')[0]);	// Typical DOM access
p(document.forms.search);						// !! where 'search' is value of form 'name' attribute

const searchForm = document.forms.search;		

p(searchForm.elements);							// returns HTML Collection of all elements in form
p(searchForm.searchInput);						// !!returns element. (i.e. 'name' attribute = 'searchInput')


//////// FORM PROPERTIES AND METHODS

/*
	searchForm.submit();						// submits form but does NOT fire SUBMIT event!?
	searchForm.reset();							// resets form
	searchForm.action = '/an/other.url';		// send to different URL

	----------
	focus()
	blur()
	etc??
*/

//////// FORM EVENTS

const testInput = searchForm.searchInput;

testInput.addEventListener('focus', () => p('focus'));		// enter
testInput.addEventListener('blur', () => p('blur'));		// exit
testInput.addEventListener('change', () => p('change'));	// exit AFTER changing
searchForm.addEventListener('submit', (e) => {
	e.preventDefault();										
	p(`Submit: you searched for '${testInput.value}'`);		// access input value
});


//////// ACCESSING & CHANGING VALUES

testInput.value = 'Search Here';				// change value.
p(testInput.value);								// get value

/* Focussing on input does not remove set value so need handlers such as this:  */ 	
/* Placeholder will usually be better option      */
testInput.addEventListener('focus', () => {
	if (testInput.value === 'Search Here') {
	    testInput.value = '';
	}
});

testInput.addEventListener('blur', () => {
	if (testInput.value === '') {
   		testInput.value = 'Search Here';
    }
 });


//////// FORM CONTROLS - examples
const form = document.forms.hero;

// text
p(form.heroName);				// returns ELEMENT

// checkbox
p(form.powers);					// [input#flight, input#strength, input#speed, input#energy, input#telekinesis, value: ""] 
document.forms.hero.powers[2].checked = true;	//set checked. (checkbox/radio)

// radio
p(form.category);				// [input#hero, input#villain, input#anti-hero, value: ""];

// select
p(form.city);					// returns select ELEMENT
p(form.city.options[1].text);	// returns text (i.e Metropolis)

// textarea
p(form.origin);					// returns textarea ELEMENT
form.origin.value = 'Born as Kal-El on the planet Krypton...';		// set initail value


form.addEventListener('submit', makeHero);

function makeHero(e) {
	e.preventDefault();	
	const hero = {};

	// text
	hero.name = form.heroName.value;

	// checkbox
	hero.powers = [...form.powers].filter(box => box.checked).map(box => box.value);  //add checked to array
	
	//radio
	hero.category = form.category.value;	// single value	only
	
	// select
	hero.city = form.city.value;
	p(form.city.options[form.city.selectedIndex].text);		// selectedIndex

	// textarea
	hero.origin = form.origin.value;

	p(hero);
	return hero;
}


//////////////// VALIDATION example

const label = form.querySelector('label');
const error = document.createElement('div');
error.classList.add('error');
error.textContent = '! Your name is not allowed to start with X.';
label.append(error);

form.heroName.addEventListener('keyup', validateInline);
form.heroName.addEventListener('keyup', disableSubmit);

function validateInline() {
    const heroName = this.value.toUpperCase();
	if(heroName.startsWith('X')){
	    error.style.display = 'block';
	    } 
	else {
	    error.style.display = 'none';
	}
}

function disableSubmit(event) {
    if(event.target.value === ''){
    	document.getElementById('submit').disabled = true;
    } 
    else {
    	document.getElementById('submit').disabled = false;
    }
}


})();