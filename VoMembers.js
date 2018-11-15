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
		return next(new errors.InvalidFieldsError('invalid fields'));
	}

	let confUser = settings.AUTH_USERS.find(user => user.username === req.user.username);
	let epuids = [];
	let newMembers = [];
	for (m of req.params.VoMembers) {
		const count = settings.VO_IDS.filter((vo_id) => { return vo_id === m.VoId }).length;
		if(count > 0 ) {
			if(confUser.vo_ids.indexOf(m.VoId) === -1) {
				logger.warn({vo_id: m.VoId, username: req.user.username});
				throw new errors.ForbiddenError('FORBIDDEN');
			} else {
				epuids.push(m.Person.Id);
				newMembers.push({
					epuid: m.Person.Id,
					vo_id: m.VoId,
					valid_from: m.ValidFrom,
					valid_through: m.ValidThrough,
					status: m.Status,
				});
			}
		} else {
			logger.warn({vo_id: m.VoId});
			throw new errors.ForbiddenError('FORBIDDEN');
		}
	}

	models.VoMembers.findAll({where: {epuid: epuids}}).then((members) => {
		let found = false;
		members.forEach(member => {
			newMembers.forEach(newMember => {
				if(newMember.epuid === member.epuid && newMember.vo_id === member.vo_id) {
					found = true;
				}
			})
		})
		if (found) {
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
	models.VoMembers.findAll({where: {epuid: req.params.epuid}}).then((m) => {
		if (!m) {
			throw new errors.DoesNotExistError(
					`No member with epuid: ${req.params.epuid}`);
		}

		res.send(m);
		return next();
	}).catch((err) => handleError(err, next));
};

const edit = function(req, res, next) {
	const validation = schemas.VoMembersRequestSchema.validate(req.params);
	if (validation.error) {
		return next(new errors.InvalidFieldsError(validation.error.message));
	}

	if (req.params.VoMembers.length !== 1) {
		return next(new errors.InvalidFieldsError('Only 1 VoMember should be specified.'));
	}

	const member = req.params.VoMembers.map((m) => {
		return {
			epuid: m.Person.Id,
			vo_id: m.VoId,
			valid_from: m.ValidFrom,
			valid_through: m.ValidThrough,
			status: m.Status,
		};
	})[0];

	models.VoMembers.findOne({where: {epuid: member.epuid}}).then((m) => {
		if (!m) {
			logger.warn({memberNotFound: member});
			throw new errors.InvalidFieldsError(member);
		}

		logger.info({processing: m});
		return m.update(member, {returning: true});
	}).then((m) => {
		logger.info({processed: m});

		res.send(m);
		return next();
	}).catch((err) => handleError(err, next));
};

module.exports = {
	add,
	view,
	edit,
};
