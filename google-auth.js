const fs = require('fs');
const readline = require('readline');
const {google} = require('googleapis');

// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/calendar'];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = 'token.json';

// Load client secrets from a local file.

function authenticate(){
    return new Promise(function(resolve,reject){
        fs.readFile('./credentials.json', (err, content) => {
            if (err) return reject(err);
            // Authorize a client with credentials, then call the Google Calendar API.
            authorize(JSON.parse(content), function(auth){
                const calendar = google.calendar({version: 'v3', auth});
                authenticate.auth=auth;
                resolve(calendar)
            },function(authUrl){
              reject({message:'Please click this url to continue',authUrl});
            });
        });
    })

}

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials, callback,recallback) {
  const oAuth2Client=authenticate.getOAuth2(credentials);

  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, (err, token) => {
    if (err) return getAccessToken(oAuth2Client, recallback);
    oAuth2Client.setCredentials(JSON.parse(token));
    callback(oAuth2Client);
  });
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */
function getAccessToken(oAuth2Client, callback) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'online',
    scope: SCOPES,
  });
  callback(authUrl);
  //console.log('Authorize this app by visiting this url:', authUrl);
  // const rl = readline.createInterface({
  //   input: process.stdin,
  //   output: process.stdout,
  // });
  // rl.question('Enter the code from that page here: ', (code) => {
  //   rl.close();
    oAuth2Client.getToken(code, (err, token) => {
      if (err) return console.error('Error retrieving access token', err);
      oAuth2Client.setCredentials(token);
      // Store the token to disk for later program executions
      fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
        if (err) return console.error(err);
        console.log('Token stored to', TOKEN_PATH);
      });
      callback(oAuth2Client);
    });
  // });
}

/**
 * Lists the next 10 events on the user's primary calendar.
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */

authenticate.getOAuth2=function(credentials){
  const {client_secret, client_id, redirect_uris} = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(
      client_id, client_secret, redirect_uris[0]);
  return oAuth2Client;
}

authenticate.TOKEN_PATH=TOKEN_PATH;

module.exports=authenticate;


function listEvents(auth) {
    
    // const start=new Date();
    // const end=new Date();
    // end.setHours(start.getHours()+1);
    // var event = {
    //     summary: 'Testing aja hehehhe',
    //     location: 'HAHAHAHA HEHEHEHEH',
    //     description: "A chance to hear more.",
    //     start: {
    //       dateTime: start.toISOString()
    //     },
    //     end: {
    //       dateTime: end.toISOString()
    //     },
    //     reminders: {
    //       useDefault: false,
    //       overrides: [
    //         { method: 'email', minutes: 24 * 60 },
    //         { method: 'popup', minutes: 10 }
    //       ]
    //     }
    //   };
    // calendar.events.insert({
    //     calendarId:'lj5fpqc0ge03cviig9kcbhio0s@group.calendar.google.com',
    //     auth:auth,
    //     resource:event
    // },(err,res)=>{
    //    if(err) return console.log('Ada error ',err);
       
    //    console.log('Berhasil',res);
    // })

//   calendar.events.list({
//     calendarId: 'lj5fpqc0ge03cviig9kcbhio0s@group.calendar.google.com',
//     timeMin: (new Date()).toISOString(),
//     maxResults: 10,
//     singleEvents: true,
//     orderBy: 'startTime',
//   }, (err, res) => {
//     if (err) return console.log('The API returned an error: ' + err);
//     const events = res.data.items;
//     if (events.length) {
//       events.map((event, i) => {
//         const start = event.start.dateTime || event.start.date;
//         console.log(`${start} - ${event.summary}`);
//       });
//     } else {
//       console.log('No upcoming events found.');
//     }
//   });

}