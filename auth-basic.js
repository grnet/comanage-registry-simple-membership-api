const passport = require('passport');
const BasicStrategy = require('passport-http').BasicStrategy;
const settings = require('./settings');

const errmsg = 'Authentication failed.';

passport.use(new BasicStrategy(
	function(username, password, done) {
		const user = settings.AUTH_USERS.filter((user) => {
			return user.username === username;
		})[0];

		if (!user) {
			return done(errmsg);
		}

		if (user.password !== password) {
			return done(null, false, {message: errmsg});
		}

		return done(null, user);
	}
));
