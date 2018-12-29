const express = require('express')
const consola = require('consola')
var bodyParser = require('body-parser');
var new_index = require('./new_index');
var ouyan = require('./ouyan');
var gzh = require('./gzh');

const {
    Nuxt,
    Builder
} = require('nuxt')
const app = express()
const host = process.env.HOST || '127.0.0.1'
const port = process.env.PORT || 3000


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));


app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type,Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE,OPTIONS');
    if (req.method == 'OPTIONS') {
        res.send(200);
    } else {
        if (req.originalUrl == "/new/load_in") {
            next();
            return
        }
        try {

            if (!token.decodeToken(req.body.token)) {
                res.json({
                    code: "-1",
                    msg: "token过期或错误1"
                })
                return
            }

        } catch (e) {

        }
        try {
            if (!token.decodeToken(req.query.token)) {
                res.json({
                    code: "-1",
                    msg: "token过期或错误2"
                })
                return
            }

        } catch (e) {

        }
        next();
    }
});



app.set('port', port)

// Import and Set Nuxt.js options
let config = require('../nuxt.config.js')
config.dev = !(process.env.NODE_ENV === 'production')

//app.use('/new/', new_index);
app.use('/ouyan_api/', ouyan);
app.use('/gzh/', gzh);


async function start() {
    // Init Nuxt.js
    const nuxt = new Nuxt(config)

    // Build only in dev mode
    if (config.dev) {
        const builder = new Builder(nuxt)
        await builder.build()
    }

    // Give nuxt middleware to express
    app.use(nuxt.render)
    // Listen the server
    app.listen(port, host)
    consola.ready({
        message: `Server listening on http://${host}:${port}`,
        badge: true
    })
}
start()
