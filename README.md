# LIRI BOT

LIRI is like Iphone's SIRI. However, while SIRI is a Speech Interpretation and Recognition Interface, LIRI is a Lanaguage Interpretation and Recognition Interface. LIRI will be a command line SIRI node program that takes basic commands and replies with information retrieved from various API's.

# API's Used:

    - Bands in Town
    - Spotify
    - OMDB

# To Use This App You Need:

    - To provide your own .env file in the working directory with various API keys to get this program to work
    - It should look like this:

            exports.spotify = {
            id: process.env.SPOTIFY_ID,
            secret: process.env.SPOTIFY_SECRET
            };
            exports.omdb = {
            key: process.env.OMDB_KEY
            };

            exports.bands = {
            key: process.env.BANDS_KEY
            };

# LIRI Should Be Able To Take In One Of The Following Commands:

    * concert-this
    * spotify-this-song
    * movie-this
    * do-what-it-says

# What Each Command Should Do:

### node liri.js concert-this <artist/band name here>

    * This will search the Bands in Town Artist Events API for an artist and render the following information about each event to the terminal:
        * Name of the venue
        * Venue location
        * Date of the event (use moment to format this as "MM/DD/YYYY")

### Ex:

    * node liri.js concert-this Mokita

### node.liri.js spotify-this-song <song name here>

    * This will show the following information about the song in your terminal/bash window:
        * Artist(s)
        * The song's name
        * A preview link of the song from Spotify
        * The album that the song is from
    * If no song is provided then your program will default to "The Sign" by Ace of Base.

### Ex:

    * node liri.js spotify-this-song Beautiful Crazy

### node liri.js movie-this <movie name here>

    * This will output the following information to your terminal/bash window:
        * Title of the movie
        * Year the movie came out
        * IMDB Rating of the movie
        * Rotten Tomatoes Rating of the movie
        * Country where the movie was produced
        * Language of the movie
        * Plot of the movie
        * Actors in the movie
    * If the user doesn't type a movie in, the program will output data for the movie "Mr. Nobody."

### Ex:

    * node liri.js movie-this Casino Royale

### node liri.js do-what-it-says

    * Using the fs Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.
        * It should run spotify-this-song for "I Want it That Way"
        * It should run movie-this for "Cold Mountain"
        * It should run concert-this for "Luke Combs"

# Video of Working LIRI:

    * [https://drive.google.com/file/d/14gIB3AaDhAJyTDBLLAKl2U6MsgDmo37x/view?usp=sharing]
