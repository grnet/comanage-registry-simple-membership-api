const NewObjectResponse = function(id, objtype) {
	return {
		ResponseType: 'NewObject',
		Version: '1.0',
		ObjectType: objtype,
		Id: id,
	};
};

const ErrorResponse = function(fields, members) {
	return {
		ResponseType: 'ErrorResponse',
		Version: '1.0',
		Id: id,
		InvalidFields: fields.reduce((f) => {
			return {
				[f.name]: f.reasons,
			};
		}),
		Memberships: members.map((m) => {
			return {[m.id]: m.name};
		}),
	};
};

module.exports = {
	NewObjectResponse,
	ErrorResponse,
};
