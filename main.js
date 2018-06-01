const file_system = require('fs');
const request = require('request');
const raw_data = file_system.readFileSync(__dirname + '/request.json');
const request_json = JSON.parse(raw_data);

console.log('raw_data: ' + raw_data);
//PostCode(raw_data);
//     request.post(
//     'http://' + api_endpoint + ':' + api_port + api_path,
//     { json: request_json },
//     function (error, response, body) {
//         if (!error && response.statusCode == 200) {
//             console.log(body);
//         } else {
//             console.log('Error: ' + error);
//         }
//     }
// );
// let sumInsured = event.sumInsured;
var options = {
uri: 'https://galaxy-dev-api.rw-hosted.com.au/premiums/calculate-by-policy',
method: 'POST',
headers: {
  'Accept': '*/*',
'X-RW-Auth-Token': 'd65e913a-3999-477f-9f97-349ce8a0aa09'
},
body: request_json,
json: true
};

function callback(error, response, body) {
if (!error && response.statusCode == 200) {
  console.log("kinda made it: " + JSON.stringify(body))
var info = JSON.parse(body);
console.log(info);
// console.log(info.forks_count + " Forks");
} else {
console.log("Error" + error);
}
}

request(options, callback);
