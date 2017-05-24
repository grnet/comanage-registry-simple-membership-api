const logger = require('./logger');
const settings = require('./settings');
const models = require('./models');
const schemas = require('./schemas');
const responses = require('./responses');
const errors = require('./errors');

const handleError = function(err, next) {
	if ('object' !== typeof err) {
		err = new errors.OtherError(err);
	}

	logger.warn(err);
	return next(err);
};

const add = function(req, res, next) {
	const validation = schemas.VoMembersRequestSchema.validate(req.params);
	if (validation.error) {
		return next(new errors.InvalidFieldsError(validation.error.message));
	}

	let epuids = [];
	let newMembers = [];
	for (m of req.params.VoMembers) {
		epuids.push(m.Person.Id);
		newMembers.push({
			epuid: m.Person.Id,
			vo_id: settings.VO_ID,
			valid_from: m.ValidFrom,
			valid_through: m.ValidThrough,
			status: m.Status,
		});
	}

	models.VoMembers.findAll({where: {epuid: epuids}}).then((members) => {
		if (members.length) {
			logger.warn({alreadyMembers: members});
			throw new errors.InvalidFieldsError(members);
		}

		logger.info({adding: newMembers});
		return models.VoMembers.bulkCreate(newMembers, {returning: true});
	}).then((newMembers) => {
		logger.info({added: newMembers});

		const response = newMembers.map((m) => {
			return responses.NewObjectResponse(m.id, 'VoMember');
		});

		res.send(response);
		return next();
	}).catch((err) => handleError(err, next));
};

const view = function(req, res, next) {
	models.VoMembers.findOne({where: {epuid: req.params.epuid}}).then((m) => {
		if (!m) {
			throw new errors.DoesNotExistError(
					`No member with epuid: ${req.params.epuid}`);
		}

		res.send(m);
		return next();
	}).catch((err) => handleError(err, next));
};

module.exports = {
	add,
	view,
};
