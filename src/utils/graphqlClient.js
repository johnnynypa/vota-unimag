import clientG  from 'graphql-client';
import config from '../config/default.json';

export default (request) => {

	const client  = clientG({
		url: config.api+'/graphql',
		headers: {
		  Authorization: 'Bearer ' + localStorage.getItem(config.localStorageLogin)
		}
	  });

	return new Promise( (resolve, reject) => {
		client.query(
			request,
			function(req, res) {
				if(res.status === 401) {
					throw new Error('Not authorized')
				}
			}
		)
		.then( body => {
			resolve(body)
		})
		.catch( err => {
			reject(err.message)
		});
	});
};
