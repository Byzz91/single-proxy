let http        = require('http')
    , moment    = require('moment')
    , url       = require('url')
    , httpProxy = require('http-proxy')
    , proxy     = httpProxy.createProxyServer({})
    , env       = require('dotenv').config()
    , cluster   = require('cluster')
    , os        = require('os')
    , workers   = [];

const HOST_IP = '10.50.140.174';
const LISTEN_PORT = 8722;

proxy.on('proxyReq', function (proxyReq, req, res, options) {
    var target = url.parse(req.url);

    if (/^(?:(?!adn|ads|static|upload2)[\w\d\-]+)\.inven\.co\.kr$/i.test(target.host)) {
        proxyReq.setHeader('X-Special-Inven-Header', 'iProxy@1.0.0 <' + process.env.PROXY_USER + '>');
    }
});

proxy.on('error', function (err, req, res) {
    if (!res.headersSent) {
        res.writeHead(500);
    }

    res.end();
});

http.createServer(function(req, res) {
    var target = url.parse(req.url)
        , originHost = target.host;

    if (/^(?:(?!adn|ads|static|upload2|kstatic|img)[\w\d\-]+)\.inven\.co\.kr$/i.test(target.host)) {
        // target.host = process.env.PROXY_HOST;
        target.host = req.connection.remoteAddress;
    }

    console.log('[%s] forwarded %s//%s to %s//%s', moment().format('YYYY-MM-DD HH:mm:ss'), target.protocol, originHost, target.protocol, target.host);

    proxy.web(req, res, {
        target: target.protocol + '//' + target.host
    });
}).listen(LISTEN_PORT, HOST_IP);
