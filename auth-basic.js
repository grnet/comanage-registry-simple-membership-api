const passport = require('passport');
const BasicStrategy = require('passport-http').BasicStrategy;

const errmsg = 'Authentication failed.';
const users = [
	{
		username: 'foo',
		password: 'bar',
	},
	{
		username: 'ltos-admin',
		password: 'sAF@wux6tuN3U&qw',
	},
];

passport.use(new BasicStrategy(
	function(username, password, done) {
		const user = users.filter((user) => user.username === username)[0];

		if (!user) {
			return done(errmsg);
		}

		if (user.password !== password) {
			return done(null, false, {message: errmsg});
		}

		return done(null, user);
	}
));
