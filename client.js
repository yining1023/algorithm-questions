var https = require('https');
var querystring = require('querystring');
/*

 set up the options for the login.
 fill in your client_id and client_secret here:

 ---

 var loginData = querystring.stringify({
    'client_id': process.env.ENERTIV_CLIENT_ID,
    'client_secret': process.env.ENERTIV_CLIENT_SECRET,
    'grant_type': 'password',
    'username': process.env.ENERTIV_USERNAME,
    'password': process.env.ENERTIV_PASSWORD,
 });

*/

/* To make it simple, we will add the credentials here for now */

var loginData = querystring.stringify({
    'client_id':'I8epiiEFdlgFHIASP41AhSn672Spp0igd22ypOEz',
    'client_secret': 'UfNXY20Z2rVdtLE7m36SgAw0S1GhWBzD4L0kLmD4uCMZAOHAIpMb9t2VjsF1BLgAVGCt5Deyn34ZtLiDggy0FfgHUJJZaG7eyIAX91sNltOsQbGCbnG9wB9g7MVzQCot',
    'grant_type': 'password',
    'username': 'energyatitp@gmail.com',
    'password': 'energyatitp123',

})

// set up the HTTPS request options. You'll modify and
// reuse this for subsequent calls:
var httpsRequestOptions = {
  rejectUnauthorized: false,
  method: 'POST',
  host: 'api.enertiv.com',
  port: 443,
  path: '/o/token/',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Content-Length': loginData.length
  }
};

/*
    the callback function to be run when the response comes in.
    this callback assumes a chunked response, with several 'data'
    events and one final 'end' response.
*/
var accessToken;
function saveToken(response) {
  var result = '';      // string to hold the response
  // as each chunk comes in, add it to the result string:
  response.on('data', function (data) {
    result += data;
  });

  // when the final chunk comes in, print it out:
  response.on('end', function () {
    result = JSON.parse(result);
    accessToken = result.access_token;
    console.log(result);
  });
}

// make the login request:
var request = https.request(httpsRequestOptions, saveToken);    // start it
request.write(loginData);                       // add  body of  POST request
request.end();
