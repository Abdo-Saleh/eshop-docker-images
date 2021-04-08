var databaseProperties = require('./db_properties.js');
var pgp = require('pg-promise')();
//var postgres = require('pg');

module.exports = {
	getConnection: ()=> {
		return pgp({
			host: databaseProperties.host,
			user: databaseProperties.user,
			port: databaseProperties.port,
			password: databaseProperties.password,
			database: databaseProperties.databaseName,
		});
	}
}

	