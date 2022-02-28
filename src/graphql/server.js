const express = require('express');
const cors = require('cors');
const expressGraphQL = require('express-graphql');
const schema = require('./schema');

const app = express();
const PORT = 4000;

app.use(cors());

app.use('/graphql', expressGraphQL({
  graphiql: true,
  schema: schema
}))

app.listen(PORT, () => {
  console.log("Listening on port: " + PORT);
});
// api url
const api_url = 
      "https://employeedetails.free.beeceptor.com/my/api/path";
  
// Defining async function
async function getapi(url) {
    
    // Storing response
    const response = await fetch(url);
    
    // Storing data in form of JSON
    var data = await response.json();
    console.log(data);
    if (response) {
        hideloader();
    }
    show(data);
}sa
// Calling that async function
getapi(api_url);

https://opentdb.com/api.php?amount=10&difficulty=easy&type=multiple