const Sequelize = require('sequelize');

const sequelize = new Sequelize(
		'registry',
		'cmregistryadmin',
		'8&rM*qK2Nm-NR2eS', {
			host: '192.168.68.5',
			dialect: 'postgres',
			define: {
				timestamps: false,
			},
		});

module.exports = sequelize;
