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

if (cluster.isMaster) {
    console.log('iProxy was started...');
    console.log(`> ${HOST_IP}:${LISTEN_PORT}`);

    // create workers
    for (var i=0, length=os.cpus().length; i < length; i++) {
        workers.push(cluster.fork());
    }

    cluster.on('exit', function (worker, code, signal) {
        workers.push(cluster.fork());
        console.log('worker was died. restarted worker');
    });

    cluster.on('SIGINT', function () {
        console.log('\nshutting down ...');
        process.exit(0);
    });
} else { // Proxy Logic
    proxy.on('proxyReq', function (proxyReq, req, res, options) {
        var target = url.parse(req.url);

        if (/^(?:(?!adn|ads|static|upload2)[\w\d\-]+)\.inven\.co\.kr$/i.test(target.host)) {
            proxyReq.setHeader('X-Special-Inven-Header', process.env.PROXY_USER.toLowerCase() + ':' + process.env.DB_MODE.toLowerCase());
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
            target.host = process.env.PROXY_HOST;
        }

        console.log('[%s] forwarded %s//%s to %s//%s', moment().format('YYYY-MM-DD HH:mm:ss'), target.protocol, originHost, target.protocol, target.host);

        proxy.web(req, res, {
            target: target.protocol + '//' + target.host
        });
    }).listen(LISTEN_PORT, HOST_IP);
}
