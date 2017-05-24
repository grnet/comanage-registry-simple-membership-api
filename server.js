const restify = require('restify');
const auth = require('./auth');
const settings = require('./settings');
const logger = require('./logger');
const VoMembers = require('./VoMembers');

const server = restify.createServer({
	name: settings.APP_NAME,
	log: logger,
});

server.use(restify.bodyParser());

server.post(`${settings.API_BASE}/VoMembers`,
		auth.basic,
		VoMembers.add);
server.get(`${settings.API_BASE}/VoMembers/:epuid`,
		auth.basic,
		VoMembers.view);
server.put(`${settings.API_BASE}/VoMembers`,
		auth.basic,
		VoMembers.edit);

server.listen(settings.PORT, settings.HOST, () => {
	logger.info('%s listening at %s', server.name, server.url);
});
