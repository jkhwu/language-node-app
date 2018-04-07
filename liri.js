// Requires
require('dotenv').config();
const keys = require('./keys.js')
const Twitter = require('twitter');
const Spotify = require('node-spotify-api');
const request = require('request');
const fs = require("fs")

// Global Variables
let spotify = new Spotify(keys.spotify);
let client = new Twitter(keys.twitter);
let [node, path, command, title] = process.argv;

// Logs input to console, appends input to log.txt file
let addLog = (logx) => {
    console.log(logx);
    fs.appendFile('./log.txt', (`${logx}\n`), (err) => {
        if (err) throw err;
    });
}

// Gets 20 latest tweets from specified Twitter user
let myTweets = () => {
    addLog('These are your last 20 tweets:');
    var params = { screen_name: 'jkhwu1' };
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (!error) {
            let logThis = "";
            for (let i = 0; i < Math.min(tweets.length, 20); i++) {
                logThis += `${tweets[i].text}\n(${tweets[i].created_at})\n`;
            }
            addLog(logThis);
        } else addLog(error);
    });
}

// Looks up song on Spotify, logs certain data
let spotifyThis = (songx) => {
    addLog('OK, looking up the song ' + songx + ' ...');
    spotify.search({ type: 'track', query: songx }, function(err, data) {
        if (err) addLog('Error occurred: ' + err);
        let result = data.tracks.items[0];
        let logThis = `SONG: ${result.name} \nLINK: ${result.external_urls.spotify} \nALBUM: ${result.album.name} \nARTIST(S):\n`;
        result.artists.forEach(artist => {
            logThis += `${artist.name}\n`;
        });
        addLog(logThis);
    });
}

// Looks up Movie on OMDB, logs certain data
let movieThis = (namex) => {
    addLog('OK, looking up the movie ' + namex + ' ...');
    let url = "http://www.omdbapi.com/?t=" + namex + "&y=&plot=short&apikey=trilogy&r=json";
    request(url, function(error, response, body) {
        if (error) return addLog('error:', error);
        let result = JSON.parse(body)
        let logThis = `TITLE: ${result.Title}\nYEAR: ${result.Year}\nIMDB RATING: ${result.Ratings[0].Value}\nROTTEN TOMATOES RATING: ${result.Ratings[1].Value}\nCOUNTRY: ${result.Country}\nLANGUAGE: ${result.Language}\nPLOT: ${result.Plot}\nACTORS: ${result.Actors}\n`
        addLog(logThis);
    });
}

// Reads random.txt file for 'command' and 'title' parameters
let doIt = () => fs.readFileSync('./random.txt', 'utf8').split(',');

// Handles user commands from terminal
let runSwitch = (commandx, titlex) => {
    switch (commandx) {
        case 'my-tweets':
            myTweets();
            break;
        case 'spotify-this-song':
            if (!titlex) titlex = "'The Sign' Ace of Base";
            spotifyThis(titlex.trim());
            break;
        case 'movie-this':
            if (!titlex) titlex = "Mr. Nobody";
            movieThis(titlex.trim());
            break;
        case 'do-what-it-says':
            console.log('Reading command from random.txt ...');
            runSwitch(doIt()[0], doIt()[1]);
            break;
        default:
            console.log('Sorry, cannot execute ' + commandx + '.');
    }
}

addLog(`${command.trim()}:`)
runSwitch(command.trim(), title);