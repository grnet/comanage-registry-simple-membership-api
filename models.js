const Sequelize = require('sequelize');
const sequelize = require('./db');

const VoMembers = sequelize.define('vo_members', {
	id: {
		primaryKey: true,
		autoIncrement: true,
		type: Sequelize.INTEGER,
	},
	epuid: {
		type: Sequelize.STRING,
	},
	vo_id: {
		type: Sequelize.STRING,
	},
	valid_from: {
		type: Sequelize.DATE,
	},
	valid_through: {
		type: Sequelize.DATE,
	},
	status: {
		type: Sequelize.STRING,
	},
});

module.exports = {
	VoMembers,
};
