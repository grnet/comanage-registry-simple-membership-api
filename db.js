const Sequelize = require('sequelize');
const settings = require('./settings');
const logger = require('./logger');

const sequelize = new Sequelize(
		settings.DB.NAME,
		settings.DB.USER,
		settings.DB.PASS,
		{
			host: settings.DB.HOST,
			dialect: settings.DB.TYPE,
			logging: logger.info.bind(logger),
			define: {
				timestamps: false,
			},
		});

module.exports = sequelize;
