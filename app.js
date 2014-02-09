var express = require('express'),
    app = express();
//    minify = require('express-minify');

var SERVER= { PORT: 8000,
			  maxAge: 0};

/**
 * Middleware
 */
app.use(express.static(__dirname + '/public', { maxAge: SERVER.maxAge })); // allow static content to be cached for a minute
/* lots of pi complaining
app.use(minify(
{
	js_match: /javascript/,
	css_match: /css/,
	sass_match: /scss/,
	less_match: /less/,
	stylus_match: /stylus/,
	coffee_match: /coffeescript/,
	cache: false,
	blacklist: [/\.min\.(css|js)$/],
	whitelist: null
}));
app.use(express.compress());
*/
//app.use(express.cookieParser());
//app.use(express.bodyParser());

// this creates an issue as we have loads of sessions! Should only set that long age if they actually login
//app.use(express.session);
//app.use(flash());

// dispatch to route
app.use(app.router);

module.exports = app.listen( SERVER.PORT );
