const Sequelize = require('sequelize');
const settings = require('./settings');

const sequelize = new Sequelize(
		settings.DB.NAME,
		settings.DB.USER,
		settings.DB.PASS,
		{
			host: settings.DB.HOST,
			dialect: settings.DB.TYPE,
			define: {
				timestamps: false,
			},
		});

module.exports = sequelize;
