const axios = require('axios')

exports.fetchAll = (callback) => {
	axios.get('/games/all')
		.then((response) => callback(response.data))
		.catch((error) => console.error(error.response.data))
}

exports.fetchData = (path, method, data, callback) => {
	const options = {
		url: `/${path}`,
		method,
		data
	}

	axios(options)
		.then(() => callback())
		.catch((error) => {
			if (error.response.status === 401) {
				alert('Invalid password')
			} else {
				console.error(error.response.data)
			}
		})
}
