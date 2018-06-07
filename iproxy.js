let http        = require('http')
    , ip        = require('ip')
    , moment    = require('moment')
    , url       = require('url')
    , httpProxy = require('http-proxy')
    , proxy     = httpProxy.createProxyServer({})
    , env       = require('dotenv').config()
    , cluster   = require('cluster')
    , os        = require('os')
    , workers   = [];

const HOST_IP = ip.address();
const LISTEN_PORT = 8722;
const VERSION = '1.0';
const REGEX_EXCEPT_DOMAINS = /^(?:(?!adn|ads|static|upload|upload2|kstatic|img|fnt)[\w\d\-]+)\.inven\.co\.kr$/i;

proxy.on('proxyReq', (proxyReq, req, res, options) => {
    var target = url.parse(req.url);

    if (REGEX_EXCEPT_DOMAINS.test(target.host)) {
        proxyReq.setHeader('X-Special-Inven-Header', `iProxy@${VERSION} <${process.env.PROXY_USER}>`);
    }
});

proxy.on('error', (err, req, res) => {
    if (!res.headersSent) {
        res.writeHead(500);
    }

    res.end();
});

http.createServer((req, res) => {
    var target = url.parse(req.url)
        , originHost = target.host;

    if (REGEX_EXCEPT_DOMAINS.test(target.host)) {
        target.host = process.env.MIRROR_HOST;
    }

    console.log('[%s] forwarded %s//%s to %s//%s', moment().format('YYYY-MM-DD HH:mm:ss'), target.protocol, originHost, target.protocol, target.host);

    proxy.web(req, res, {
        target: target.protocol + '//' + target.host
    });
}).listen(LISTEN_PORT, HOST_IP);
