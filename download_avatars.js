var request = require('request');
var secrets = require('./secrets');
var fs = require('fs');

console.log('Welcome to the GitHub Avatar Downloader!');

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

getRepoContributors(process.argv[2], process.argv[3], function (err, result, body) {
  if (!process.argv[2] || !process.argv[3]) {
    throw "Please input the owner and name of the repository.";
  }
  var body = JSON.parse(body);

  body.forEach(function (element) {
    var URL = element.avatar_url;
    var path = element.login;
    downloadImageByURL(URL, 'avatars/' + path + '.jpg');
  });
});

function downloadImageByURL(url, filePath) {
  fs.mkdir('avatars', function (err) {
    request.get(url)
      .on('error', function (err) {                                   // Note 2
        throw err;
      })
      .pipe(fs.createWriteStream(filePath));               // Note 4
  });
};
