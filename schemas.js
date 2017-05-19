const Joi = require('joi');

const PersonSchema = Joi.object().keys({
	Type: Joi.string().valid('CO'),
	Id: Joi.string().token().max(256).required(),
});

const VoMemberSchema = Joi.object().keys({
	Version: Joi.string().valid('1.0'),
	VoId: Joi.string().token().max(256).valid('vo.access.egi.eu').required(),
	Person: PersonSchema,
	Status: Joi.string().valid([
			'Active',
			'Approved',
			'Confirmed',
			'Declined',
			'Deleted',
			'Denied',
			'Duplicate',
			'Expired',
			'GracePeriod',
			'Invited',
			'Pending',
			'PendingApproval',
			'PendingConfirmation',
			'Suspended',
	]).required(),
	ValidFrom: Joi.date().iso().required(),
	ValidThrough: Joi.date().iso().required(),
});

const VoMembersRequestSchema = Joi.object().keys({
	RequestType: Joi.string().valid('VoMembers'),
	Version: Joi.string().valid('1.0'),
	VoMembers: Joi.array().items(VoMemberSchema),
});

const VoMembersResponseSchema = Joi.object().keys({
	ResponseType: Joi.string().valid('VoMembers'),
	Version: Joi.string().valid('1.0'),
	VoMembers: Joi.array().items(VoMemberSchema),
});

module.exports = {
	PersonSchema,
	VoMemberSchema,
	VoMembersRequestSchema,
	VoMembersResponseSchema,
};
