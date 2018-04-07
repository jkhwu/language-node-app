# language-node-app
an exercise using node to request data from APIs

### Overview

This is a simple node app that takes commands via the terminal and returns data from the Twitter, Spotify, and OMDB APIs.

### Links

* [Twitter](https://www.npmjs.com/package/twitter)

* [Node-Spotify-API](https://www.npmjs.com/package/node-spotify-api)

* [OMDB API](http://www.omdbapi.com).


### Authentication

Note that you will have to create a local file named `.env` and enter your own Twitter and Spotify keys as follows:

```
# Spotify API keys

SPOTIFY_ID=your-spotify-id
SPOTIFY_SECRET=your-spotify-secret

# Twitter API keys

TWITTER_CONSUMER_KEY=your-twitter-consumer-key
TWITTER_CONSUMER_SECRET=your-twitter-consumer-secret
TWITTER_ACCESS_TOKEN_KEY=your-access-token-key
TWITTER_ACCESS_TOKEN_SECRET=your-twitter-access-token-secret
```
* Get your Twitter API keys (4) at <https://apps.twitter.com/app/new>
* Get your Spotify API keys (2) by going to <https://developer.spotify.com/my-applications/#!/> and creating a new app.
* Copy and paste the 6 keys into your local `.env` file.

### Setup
Note all dependencies in the package.json file and install them before running the app.

### Usage

Run the file by command line by navigating to the project directory and entering `node liri.js` followed immediately by one of four commands:

* `my-tweets` (gets my latest 20 tweets)
* `spotify-this-song` followed by a song name of your choosing in quotation marks, e.g. `"Salty Eyes` (logs song data to console)
* `movie-this` followed by a movie title of your choosing in quotation marks, e.g. `"Toy Story"` (logs movie data to console)
* `do-what-it-says` (reads the file content of `random.txt` and executes the command therein)

Note: This app will default to searching its own titles if user does not enter one.

### Access

This app can also be accessed from my [portfolio page](https://jkhwu.github.io/Responsive-Portfolio/portfolio.html?vs=1) as a demo of node practice.



