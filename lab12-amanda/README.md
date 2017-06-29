
## Lab-12-express-middleware

I looked through Matthew Parker's code to understand how to do this.

The tests  start  server when they begin and stop the server when they finish.

To start the server enter npm run start-db into the CLI. To run the test enter npm test into the CLI.

This code includes tests to ensure that the api returns a status code of 404 for routes that have not been registered
write tests to ensure  /api/resource-name endpoint responds as described for each condition below:
*  GET - test 404, responds with 'not found' for valid request made with an id that was not found
*  GET - test 200, response body like {<data>} for a request made with a valid id -->
*  PUT - test 200, response body like {<data>} for a post request with a valid body
*  PUT - test 400, with invalid body
*  PUT - test 404, with invalid id -->
*  *  DELETE - test 204, with valid id
*  DELETE - test 404, with invalid id -->
*  POST - test 200, response body like {<data>} for a post request with a valid body
*  POST - test 400, with an invalid request body -->
* POST - test 409, with an a conflict for a unique property
