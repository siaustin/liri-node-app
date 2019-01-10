// add code to read and set any environment variables with the doten package
require('dotenv').config();

// add the code required to import the keys.js file and store it in a variable
var keys = require('./keys.js');
var axios = require('axios');
var moment = require('moment');
var Spotify = require('node-spotify-api');
var fs = require('fs');
