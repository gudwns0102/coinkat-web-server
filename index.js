var express = require('express');
var http = require('http');
var https = require('https');
var app = express();

const lex = require('greenlock-express').create({
  version: 'v02', // draft-11 버전 인증서 사
  configDir: require('path').join(require('os').homedir(), 'letsencrypt'), // 또는 ~/letsencrypt/etc
  server: 'staging',
  approveDomains: (opts, certs, cb) => {
    if (certs) {
      opts.domains = ['www.coinkat.tk'];
    } else {
      opts.email = 'sejong3408@gmail.com';
      opts.agreeTos = true;
    }
    cb(null, { options: opts, certs });
  },
  renewWithin: 81 * 24 * 60 * 60 * 1000,
  renewBy: 80 * 24 * 60 * 60 * 1000,
});

app.get('/', (req, res) => res.send('Hello World!'))

http.createServer(app).listen(80);
//http.createServer(lex.middleware(require('redirect-https')())).listen(80);
https.createServer(lex.httpsOptions, lex.middleware(app)).listen(443);

