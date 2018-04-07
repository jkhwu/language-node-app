require("dotenv").config();
let keys = require('./keys.js')
let Twitter = require('twitter');
let Spotify = require('node-spotify-api');
let spotify = new Spotify(keys.spotify);
let client = new Twitter(keys.twitter);

let [node, path, command, title] = process.argv;

switch (command) {
    case 'my-tweets':
        console.log('These are your last 20 tweets:');
        break;
    case 'spotify-this-song':
        console.log('OK, looking up your song: ' + title);
        break;
    case 'movie-this':
        console.log('OK, looking up your movie: ' + title);
        break;
    case 'do-what-it-says':
        console.log('Reading command from random.txt ...');
        break;
    default:
        console.log('Sorry, cannot execute ' + command + '.');
}