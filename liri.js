require("dotenv").config();
const keys = require('./keys.js')
const Twitter = require('twitter');
const Spotify = require('node-spotify-api');
const request = require('request');
const fs = require("fs")

let spotify = new Spotify(keys.spotify);
let client = new Twitter(keys.twitter);
let [node, path, command, title] = process.argv;

let myTweets = () => {
    console.log('These are your last 20 tweets:');
    var params = { screen_name: 'jkhwu1' };
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (!error) {
            for (let i = 0; i < Math.min(tweets.length, 20); i++) console.log(tweets[i].created_at + ": " + tweets[i].text);
        } else console.log(error);
    });
}

let spotifyThis = () => {
    console.log('OK, looking up the song "' + title.trim() + '" ...');
    spotify.search({ type: 'track', query: title.trim() }, function(err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        let result = data.tracks.items[0];
        // console.log(JSON.stringify(result, null, 2));
        console.log("SONG: " + result.name);
        console.log("ARTIST(S):");
        result.artists.forEach(artist => {
            console.log(artist.name);
        });
        console.log("LINK: " + result.external_urls.spotify);
        console.log("ALBUM: " + result.album.name);
    });
}

let movieThis = () => {
    console.log('OK, looking up the movie "' + title.trim() + '" ...');
    let url = "http://www.omdbapi.com/?t=" + title.trim() + "&y=&plot=short&apikey=trilogy&r=json";
    request(url, function(error, response, body) {
        if (error) return console.log('error:', error);
        // console.log('statusCode:', response && response.statusCode);
        // console.log('body:', JSON.parse(body))
        let result = JSON.parse(body)
        console.log("TITLE: " + result.Title);
        console.log("YEAR: " + result.Year);
        console.log("IMDB RATING: " + result.Ratings[0].Value);
        console.log("ROTTEN TOMATOES RATING: " + result.Ratings[1].Value);
        console.log("COUNTRY: " + result.Country);
        console.log("LANGUAGE: " + result.Language);
        console.log("PLOT: " + result.Plot);
        console.log("ACTORS: " + result.Actors);
    });

}

let doIt = () => {
    console.log('Reading command from random.txt ...');
    fs.readFile('./random.txt', 'utf8', (err, data) => {
        if (err) throw err;
        console.log(data)
    });
}

switch (command) {
    case 'my-tweets':
        myTweets();
        break;
    case 'spotify-this-song':
        if (!title) title = "'The Sign' Ace of Base";
        spotifyThis();
        break;
    case 'movie-this':
        if (!title) title = "Mr. Nobody";
        movieThis();
        break;
    case 'do-what-it-says':
        doIt();
        break;
    default:
        console.log('Sorry, cannot execute ' + command + '.');
}