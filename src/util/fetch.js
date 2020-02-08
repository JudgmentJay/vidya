const proxy = 'http://localhost:3010'

exports.fetchAll = (callback) => {
	fetch(`${proxy}/games/all`)
		.then((response) => {
			if (response.status === 404) {
				console.log('Bad Response')
			} else if (response.ok) {
				return response.json()
			}
		})
		.then((result) => callback(result))
}

exports.fetchData = (path, method, data, callback) => {
	fetch(`${proxy}/${path}`, {
		method,
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	}).then((response) => {
		if (response.status === 400) {
			alert('Invalid Password')
		} else if (response.status === 404) {
			console.log('Bad Response')
		} else if (response.ok) {
			callback()
		}
	})
}
