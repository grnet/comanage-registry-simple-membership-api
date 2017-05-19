const restify = require('restify');
const passport = require('passport');
const basicAuth = require('./auth-basic');
const logger = require('./logger');
const VoMembers = require('./VoMembers');

const server = restify.createServer({
	name: 'MyApp',
	log: logger,
});

server.use(restify.bodyParser());

server.post('VoMembers',
		passport.authenticate('basic', {session: false}),
		VoMembers.add);
server.get('VoMembers/:epuid',
		passport.authenticate('basic', {session: false}),
		VoMembers.view);

server.listen(8080);
