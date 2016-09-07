# craigslist-and-yelp

CRAIGSLIST (found in `example.js` and `searchcraigslist.js`)

Inputs:
* array of three neighbourhoods
* max price

Output:
* object with the following formatting:
  ```
  {
   neighbourhoods: ['nob hill', 'mission', 'sunset'],
   listings: {
     nob hill: [
       { link: link,
         body:body
         etc...
       },
     ],
     mission: [<listing objects>],
     sunset: [<listing objects>]
   }
  }
  ```
  
YELP (found in yelp-results.js)

Inputs:
* location
* search term

Output:
* search object, which is passed to helper function
  * helper function should output an array of top three neighbourhoods


sample data for CL can be found in results.json
sample data for yelp can be found in yelp-results.json
