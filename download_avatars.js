var request = require('request');
var secrets = require('./secrets');

console.log('Welcome to the GitHub Avatar Downloader!');
// var repoOwner = process.argv[2];
// var repoName = process.argv[3];
function getRepoContributors(repoOwner, repoName, cb) {
  var options =
  {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers:
    {
      'User-Agent': 'request',
      'Authorization': 'token ' + secrets.GITHUB_TOKEN
    }
  }

  request(options, function (err, res, body) {
    cb(err, res, body);
  });
};

getRepoContributors("jquery", "jquery", function (err, result, body) {
  var body = JSON.parse(body);

  body.forEach(function (element) {
    console.log(element.avatar_url);
  });
});


