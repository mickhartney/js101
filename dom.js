(function() {
///////////////////////////////// DOM ////////////////////////////////////

const body = document.body;

p(body.nodeType);				// 1	(1: element; 2: attribute; 3: text; 8: comment;)
p(body.nodeName);				// BODY


// Legacy DOM shortcuts
document.body;					// body
document.images;				// all images
document.links;					// all a (& area?) tags with 'href'
document.anchors;				// all a with 'name' attr
document.forms;					// all forms


// Arraylike objects only - convert to array
const imageArray = [...document.images];


///////////////////////////////// Getting elements //////////////////////////

const heading = document.getElementById('title');		// returns ref to element (LIVE?). null if not fount
//p(heading);
const listItems = document.getElementsByTagName('li');	// returns (LIVE) HTMLCollection. empty collection if not found
//p(listItems);
const paras = document.getElementsByClassName('para');	// returns (LIVE) HTMLCollection. empty collection if not found
//p(paras);

// css selectors
const qParas = document.querySelectorAll('.para');		// returns NodeList (NOT LIVE). empty list if not found
//p(qParas);
const qHeader = document.querySelector('#title');		// returns ref to FIRST el found. (NOT LIVE?)
//p(qHeader);

p(paras[0]);											// !!! don't forget index to access from list

	/* LIVE collections have poorer performance and can cause trouble when accessing by index */


//////////////////////////////// Navigating the DOM tree ////////////////////

	/*  Pretty sketchy.
			# firstChild, lastChild, siblings affected by whitespace/text
			# Use children and parentNode for els instead
			# Break down to each level
			# textContent is better/shorter (.firstChild > .nodeValue)
	*/

	/*  Further info
		    # firstElementChild
			# lastElementChild
			# append/prepend (as opposed to appendChild)
	*/

const list = document.getElementsByTagName('ul')[0];
const listItem1 = listItems[0];
const listItem1Text = listItem1.firstChild;
const listItem2 = listItems[1];

p(list.childNodes);					// NodeList(7) [text, li,...]   !!! ALL children (inc. text, white space etc)
p(list.children);					// HTMLCollection(3)! [li, li, li]		ELEMENT nodes only			
p(list.firstChild);					// #text	!!! whitespace
p(list.lastChild);					// #text	
p(list.parentNode);					// <div id="wrap">
p(listItem1.nextSibling);			// #text
p(listItem1.previousSibling);		// #text


// WTF!
p(listItem1.fistChild);				// undefined		??? !!! Break it down first
p(listItem1Text);					// 'item 1'			
p(listItem1Text.nodeValue);			// item 1	

p(listItem2.textContent);			// item 2			bit more reliable


///////////////////////////////// Getting and Setting attributes /////////////////

p(listItem2.getAttribute('class'));			// even
p(listItem2.getAttribute('src'));			// null
p(listItem1.setAttribute('class', 'odd'));	// undefined	!!! WARNING - overwrites other attr/classes
p(listItem1.getAttribute('class'));			// odd			!!! previously had .first also

///////////////// Classes
p(listItem1.className);						// odd
listItem1.className = 'first';				// !!! WARNING - removes other classes
p(listItem1.className);						// first

/////// classList				  !!! IE10+
listItem1.classList.add('odd');				// maintains existing classes!!
p(listItem1.classList);						// DOMTokenList(2) ['first', 'odd', value: 'first odd']
listItem1.classList.remove('odd');
p(listItem1.getAttribute('class'));			// first

// !!!TOGGLE
p(listItem1.classList.toggle('active'));	// true	- returns true if adding, false if removing. 
p(listItem1.getAttribute('class'));			// first active

// Contains
p(listItem1.classList.contains('first'));	// true
p(listItem1.classList.contains('random'));	// false


///////////////////////////////// Creating dynamic markup //////////////////////

/////// Creating
const listItem4 = document.createElement('li');
const listItem4Text = document.createTextNode('list item 4');

/////// Appending
listItem4.appendChild(listItem4Text);
p(listItem4);								// <li>list item 4</li>

/////// Shorter alternative (without need for .createTextNode & .appendChild)
const listItem5 = document.createElement('li');
listItem5.textContent = 'list item 5';
p(listItem5);								// <li>list item 5</li>

/////// Helper function!!
function createElement(tag, text) {
	const newTag = document.createElement(tag);
	newTag.textContent = text;
	return newTag;
}

const listItem6 = createElement('li', 'list item 6');
p(listItem6);								// <li>list item 6</li>

// Inject (demo)
list.appendChild(listItem5);				// parent.appendChild(newChild)
list.insertBefore(listItem4, listItem5);	// parent.insertBefore(newChild, existingChild)
p(list);

//list.append(listItem5, listItem6);		// Further info

//////// Remove
list.removeChild(listItem5);
p(list);

/////// Replace
const newText = document.createTextNode('new list item 1');
listItem1.replaceChild(newText, listItem1Text);
p(listItem1);								// <li..>new list item 1</li>

////// innerHTML
p(list.innerHTML);							// get
p(listItem2.innerHTML = 'second item');		// set   !!! Much easier and quicker than other methods


//////////////////////////////////////// CSS ////////////////////////////////

// set
paras[0].style.color = 'red';			// don't forget index
paras[0].style.fontSize = '24px';		// use camelCase instead of hyphen

// get
p(paras[0].style);						// !! only gets INLINE or SCRIPTED styles
getComputedStyle(paras[1]);				// shows COMPLETE list of inherited styles

// Much better approach to styling
paras[1].classList.add('testClass');	
	












})();