### Directions
Please setup a database to house the provided data (labels, artists, releases) and create a dynamic API endpoint that can serve data as follows:

Based on an artist name or ID - return all of the associated releases and relevant data. Please include the artist information and label information in your JSON response. 

For example, when querying for the artist "Banks", the response would include her artist info (spotify id, genres), multiple releases, as well as her associated label info (region, distributor). 

Please commit this to a public repo, provide instructions on how to setup / run locally, as well as the shape of the request through something like cURL or Postman. Aside from working within node, the db and server-side framework is of your choice.

If you have any questions please don't hesitate to ask.

##### Extra credit
- Query by multiple artist id's or names 
- Query by type "album" or "single" release
- Query by label id
- Query by UPC
Note: When yielding multipel artists, be sure to include the label and release info within each artist object.
