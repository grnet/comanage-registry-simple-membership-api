const restify = require('restify');
const util = require('util');

const BadRequestError = function(message) {
	restify.RestError.call(this, {
		restCode: 'BadRequest',
		statusCode: 400,
		message: message,
		constructorOpt: BadRequestError,
	});
	this.name = 'BadRequestError';
};

const ForbiddenError = function(message) {
	restify.RestError.call(this, {
		restCode: 'Forbidden',
		statusCode: 403,
		message: message,
		constructorOpt: ForbiddenError,
	});
	this.name = 'DoesNotExistError';
};

const DoesNotExistError = function(message) {
	restify.RestError.call(this, {
		restCode: 'DoesNotExist',
		statusCode: 404,
		message: message,
		constructorOpt: DoesNotExistError,
	});
	this.name = 'DoesNotExistError';
};

const InvalidFieldsError = function(message) {
	restify.RestError.call(this, {
		restCode: 'InvalidFields',
		statusCode: 400,
		message: message,
		constructorOpt: InvalidFieldsError,
	});
	this.name = 'InvalidFieldsError';
};

const OtherError = function(message) {
	restify.RestError.call(this, {
		restCode: 'OtherError',
		statusCode: 500,
		message: message,
		constructorOpt: OtherError,
	});
	this.name = 'OtherError';
};

util.inherits(BadRequestError, restify.RestError);
util.inherits(ForbiddenError, restify.RestError);
util.inherits(DoesNotExistError, restify.RestError);
util.inherits(InvalidFieldsError, restify.RestError);
util.inherits(OtherError, restify.RestError);

module.exports = {
	BadRequestError,
	ForbiddenError,
	DoesNotExistError,
	InvalidFieldsError,
	OtherError,
};
