const passport = require('passport');
const BasicStrategy = require('passport-http').BasicStrategy;
const logger = require('./logger');
const settings = require('./settings');

const errmsg = 'Authentication failed.';

passport.use(new BasicStrategy(
	function(username, password, done) {
		const user = settings.AUTH_USERS.filter((user) => {
			return user.username === username;
		})[0];

		if (!user) {
			logger.warn(errmsg);
			return done(errmsg);
		}

		if (user.password !== password) {
			logger.warn(errmsg);
			return done(null, false, {message: errmsg});
		}

		return done(null, user);
	}
));

const basic = passport.authenticate('basic', {session: false});

module.exports = {
	basic,
};
