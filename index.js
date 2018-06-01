let querystring = require('querystring');
let file_system = require('fs');
let http = require('http');
let token = 'd65e913a-3999-477f-9f97-349ce8a0aa09';
let api_endpoint = '54.252.135.174'
let api_port = 8085;
let api_path = '/premiums/calculate-by-policy';
let request = require('request');

function PostCode(codestring) {
  // Build the post string from an object
  var post_data = querystring.stringify({
      'compilation_level' : 'ADVANCED_OPTIMIZATIONS',
      'output_format': 'json',
      'output_info': 'compiled_code',
        'warning_level' : 'QUIET',
        'js_code' : codestring
  });

  // An object of options to indicate where to post to
  var post_options = {
      host: api_endpoint,
      port: api_port,
      path: api_path,
      method: 'POST',
      headers: {
          'Accept': '*/*',
          'Content-Type': 'application/x-www-form-urlencoded',
          'Content-Length': Buffer.byteLength(post_data),
          'X-RW-Auth-Token': token
      }
  };


  // Set up the request
  var post_req = http.request(post_options, function(res) {
      res.setEncoding('utf8');
      res.on('data', function (chunk) {
          console.log('Response: ' + chunk);
      });
  });

  // post the data
  post_req.write(post_data);
  post_req.end();

}

exports.handler = (event, context, callback) => {

    let raw_data = file_system.readFileSync(__dirname + '/request.json');
    let request_json = JSON.parse(raw_data);

    console.log(raw_data);
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
  url: 'https://galaxy-dev-api.rw-hosted.com.au/version-internal',
  headers: {
    'X-RW-Auth-Token': 'd65e913a-3999-477f-9f97-349ce8a0aa09'
  }
};

function callback(error, response, body) {
  if (!error && response.statusCode == 200) {
    var info = JSON.parse(body);
    console.log(info);
    // console.log(info.forks_count + " Forks");
  } else {
    console.log("Error" + error);
  }
}

request(options, callback);

callback();
};
