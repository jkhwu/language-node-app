require("dotenv").config();
let keys = require('./keys.js')
let Twitter = require('twitter');
let Spotify = require('node-spotify-api');
// let request = require('request');
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
    console.log('OK, looking up the song: "' + title + '" ...');
    spotify.search({ type: 'track', query: title }, function(err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        // console.log(JSON.stringify(data.tracks.items[0], null, 2));
        let result = data.tracks.items[0];
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
    console.log('OK, looking up your movie: ' + title + '...');
}

let doIt = () => {
    console.log('Reading command from random.txt ...');
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
        movieThis();
        break;
    case 'do-what-it-says':
        doIt();
        break;
    default:
        console.log('Sorry, cannot execute ' + command + '.');
}