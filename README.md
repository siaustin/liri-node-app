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
