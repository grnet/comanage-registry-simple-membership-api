const restify = require('restify');
const passport = require('passport');
const basicAuth = require('./auth-basic');
const settings = require('./settings');
const logger = require('./logger');
const VoMembers = require('./VoMembers');

const server = restify.createServer({
	name: settings.APP_NAME,
	log: logger,
});

server.use(restify.bodyParser());

server.post(`${settings.API_BASE}/VoMembers`,
		passport.authenticate('basic', {session: false}),
		VoMembers.add);
server.get(`${settings.API_BASE}/VoMembers/:epuid`,
		passport.authenticate('basic', {session: false}),
		VoMembers.view);

server.listen(settings.PORT);
