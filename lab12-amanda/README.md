

npm run start-db
npm test

I looked through Matthew Parker's code to understand how to do this.

your tests should start your server when they begin and stop your server when they finish
write a test to ensure that your api returns a status code of 404 for routes that have not been registered
write tests to ensure your /api/resource-name endpoint responds as described for each condition below:
GET - test 404, responds with 'not found' for valid request made with an id that was not found
GET - test 200, response body like {<data>} for a request made with a valid id
<!-- PUT - test 200, response body like {<data>} for a post request with a valid body
PUT - test 400, with invalid body
PUT - test 404, with invalid id -->
<!-- DELETE - test 204, with valid id
DELETE - test 404, with invalid id -->
<!-- POST - test 200, response body like {<data>} for a post request with a valid body
POST - test 400, with an invalid request body -->
POST - test 409, with an a conflict for a unique property
