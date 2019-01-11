// add code to read and set any environment variables with the doten package
require('dotenv').config();

// add the code required to import the keys.js file and store it in a variable
var keys = require('./keys.js');
var axios = require('axios');
var moment = require('moment');
var Spotify = require('node-spotify-api');
var fs = require('fs');

function outputResponse(response) {
  console.log(response);

  fs.appendFile('log.txt', response + '\n', function(err) {
    if (err) console.log(err);
  });
}

// Concert-this

function bandsInTown(artist) {
  if (artist == '') {
    artist = 'Ace of Base';
    outputResponse('Default is ' + artist + ' because no artist was provided\n');
  }

  var apiURL = 'https://rest.bandsintown.com/artists/' + artist + '/events?app_id=codingbootcamp';
  var response = '';

  axios.get(apiURL).then(
    function(res) {
      res.data.forEach(show => {
        var lineup = '';
        show.lineup.forEach(artist => {
          lineup += artist + '||';
        });

        response += lineup.slice(0, -2) + '\n';

        response += '@ ' + show.venue.name + ' (' + show.venue.city + ', ' + show.venue.region + ')' + '\n';
        response += moment(show.datetime).format('MM/DD/YYYY h:mm a') + '\n';
        response += '-----------' + '\n';
      });

      outputResponse(response.slice(0, -1));
    },
    function(err) {
      console.log(err);
    }
  );
}
// Spotify-this-song

function spotifySong(song) {
  if (song === '') {
    song = 'The Sign';
    outputResponse('Default is ' + song + ' because no song was provided');
  }

  var spotify = new Spotify(keys.spotify);
  var response = '';

  spotify
    .search({ type: 'track', query: song, limit: 1 })
    .then(function(res) {
      var track = res.tracks.items[0];

      var artistLine = '';

      track.artists.forEach(artist => {
        artistLine += artist.name + ' & ';
      });

      artistLine = artistLine.slice(0, -3);

      response += track.name + ' by ' + artistLine + '\n';

      response += 'From ' + track.album.name + '\n';

      response += 'Link: ' + track.external_urls.spotify;

      outputResponse(response);
    })
    .catch(function(err) {
      console.log(err);
    });
}

// Movie-this

function omdb(movie) {
  if (movie === '') {
    movie = 'Mr. Nobody';
    outputResponse('Default is ' + movie + ' because no movie was given');
  }

  var apiURL = 'http://www.omdbapi.com/?t=' + movie + '&y=&plot=short&apikey=' + keys.omdb.key;
  var response = '';

  axios.get(apiURL).then(
    function(res) {
      var movie = res.data;
      response += movie.Title + ' (' + movie.Year + ' in ' + movie.Country + ')' + '\n';
      response += '================' + '\n';
      var ratingsLine = '';

      movie.Ratings.forEach(rating => {
        ratingsLine += rating.Source + ': ' + rating.Value + ' | ';
      });
      response += ratingsLine.slice(0, -2) + '\n';
      response += 'Directed by ' + movie.Director + '\n';
      response += 'Authored by ' + movie.Writer + '\n';
      response += 'Starring: ' + movie.Actors + '\n';

      response += 'Movie Plot: ' + movie.Plot + '\n';

      response += 'Language: ' + movie.Language;

      outputResponse(response);
    },
    function(err) {
      console.log(err);
    }
  );
}

function fileCommand() {
  fs.readFile('random.txt', 'utf8', function(err, data) {
    if (err) {
      console.log(err);
    } else {
      var command = data.split(',');

      if (command[0] === 'do-what-it-says') {
        outputResponse('End the loop!');
      }

      runCommand(command[0], command[1].slice(1, -1));
    }
  });
}

function runCommand(command, argument) {
  switch (command) {
    case 'concert-this':
      bandsInTown(argument);
      break;
    case 'spotify-this-song':
      spotifySong(argument);
      break;
    case 'movie-this':
      omdb(argument);
      break;
    case 'do-what-it-says':
      fileCommand();
      break;
  }
}

var argument = '';

for (var i = 3; i < process.argv.length; i++) {
  argument += ' ' + process.argv[i];
}

fs.appendFile('log.txt', '[[' + process.argv[2] + ' ' + argument + ']]\n', function(err) {
  if (err) console.log(err);
});

runCommand(process.argv[2], argument.trim());
