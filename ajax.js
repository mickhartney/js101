(function() {
/////////////////////////////////////// AJAX ///////////////////////////////////	

fetch('https://swapi.co/api/people/1')
    .then((response) => {
        if(response.ok) {
            return response;
        }
        throw Error(response.statusText);
    })
    .then( response => p(response))
    .catch( error => p('There was an error!') );



// Blob - raw data such as image or spreadsheet
fetch(url)
 	.then( response => response.blob() ) 	// transforms the data into a blob object
	.then( blob => console.log(blob.type) )
	.catch( error => console.log('There was an error: ', error));

})();



// JSON responses !!!!!!!!!!
fetch(url)
 	.then( response => response.json()) 		// transforms the JSON data into a JavaScript object
	.then( data => {
        for (const [key, val] of Object.entries(data)) {
            p(`${key}: ${val}`);
        }
    })
	.catch( error => console.log('There was an error: ', error));




// Creating a response object (for testing, or creating an API maybe)
const response = new Response( 'Hello!', {
	ok: true,
	status: 200,
	statusText: 'OK',
	type: 'cors',
	url: '/api'
});



// Request interface
const request = new Request('https://example.com/data', {	// assign to var. URL required
	method: 'GET',											// object with optionaloptional props
	mode: 'cors',
	redirect: 'follow',
	cache: 'no-cache'
});

fetch(request)										// fetch with var
.then( //do something with the response )
.catch( //handle any errors);


fetch('https://example.com/data', {					// !!Alternative - without constructor
    method: 'GET',
    mode: 'cors',
    redirect: 'follow',
    cache: 'no-cache'
})
.then( // do something with the response )
.catch( // handle any errors);



// Headers interface
const headers = new Headers({ 'Content-Type': 'text/plain',
'Accept-Charset' : 'utf-8', 'Accept-Encoding':'gzip,deflate'});

headers.has('Content-Type');						// true - check props
headers.get('Content-Type');						// 'text/plain' - get props
headers.set('Content-Type', 'application/json');	// set/over-ride
headers.append('Accept-Encoding','gzip,deflate');	// add
headers.delete('Accept-Encoding')					// remove

for(const entry of headers.entries() {				// iterate over header
	p(entry);										// eg. [ 'Content-Type', 'application/json' ]
}									




// Putting it all together
const url = 'https:example.com/data';
const headers = new Headers({ 'Content-Type': 'text/plain',
'Accept-Charset' : 'utf-8', 'Accept-Encoding':'gzip,deflate' });

const request = (url,{
	headers: headers
});

fetch(request)
	.then(function(response) {
		if (response.ok) {
			return response;
		}
		throw Error(response.statusText);
	})
	.then( response => // do something with response )
	.catch( error => console.log('There was an error!') )


