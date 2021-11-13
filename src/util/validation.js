exports.validateForm = (fieldsToValidate) => {
	const validationResults = []

	fieldsToValidate.forEach((field) => {
		const validField = validateField(field.type, field.value)

		if (!validField) {
			validationResults.push(field.type)
		}
	})

	return validationResults
}

const months = [
	'January',
	'February',
	'March',
	'April',
	'May',
	'June',
	'July',
	'August',
	'September',
	'October',
	'November',
	'December'
]

const validateField = (type, value) => {
	if (!value) return false

	const validPlatforms = [
		'PC',
		'PS5',
		'PS4',
		'PS3',
		'Switch',
		'WiiU',
		'3DS',
		'X360',
		'Vita',
		'PSP'
	]

	const twoDigit = /^[0-9]{1,2}$/
	const score = /^[0-9]{1,2}(.5)?$/
	const hours = /^[0-9]{1,4}(.5)?$/
	const validDate = /^\w+\s[0-9]{1,2}\s[0-9]{4}$/

	switch (type) {
		case 'title': {
			if (value.length < 2) {
				return false
			}

			return true
		}
		case 'release': {
			value = value.replace(',', '')

			const dateParts = value.split(' ')
			const month = dateParts[0]
			const date = parseInt(dateParts[1])
			const year = parseInt(dateParts[2])

			const now = new Date()

			if (
				!value.match(validDate) ||
				!months.includes(month) ||
				(date <= 0 || date > 31) ||
				(year < 1970 || year > now.getFullYear() + 5)
			) {
				return false
			}

			return true
		}
		case 'score': {
			if (!value.match(score) || parseFloat(value) > 10) {
				return false
			}

			return true
		}
		case 'start': {
			const started = value.dateStarted.replace(',', '')

			const dateParts = started.split(' ')
			const month = dateParts[0]
			const date = dateParts[1]
			const year = dateParts[2]

			const now = new Date()
			const releaseDate = new Date(value.releaseDate)
			const dateStarted = new Date(value.dateStarted)
			const timeStarted = dateStarted.getTime()

			if (
				!started.match(validDate) ||
				!months.includes(month) ||
				(date <= 0 || date > 31) ||
				(year < 1970 || year > now.getFullYear() + 5) ||
				timeStarted < releaseDate - 60 * 60 * 24 * 3 * 1000 ||
				dateStarted > now
			) {
				return false
			}

			return true
		}
		case 'finish': {
			const finished = value.dateFinished.replace(',', '')

			const dateParts = finished.split(' ')
			const month = dateParts[0]
			const date = dateParts[1]
			const year = dateParts[2]

			const now = new Date()
			const dateStarted = new Date(value.dateStarted)
			const dateFinished = new Date(value.dateFinished)

			if (
				!finished.match(validDate) ||
				!months.includes(month) ||
				(date <= 0 || date > 31) ||
				(year < 2015 || year > now.getFullYear()) ||
				dateFinished < dateStarted ||
				dateFinished > now
			) {
				return false
			}

			return true
		}
		case 'hours': {
			if (!value.match(hours) || parseFloat(value) <= 0) {
				return false
			}

			return true
		}
		case 'completed': {
			if (!value.match(twoDigit) || parseInt(value) < 0) {
				return false
			}

			return true
		}
		case 'platform': {
			if (!validPlatforms.includes(value)) {
				return false
			}

			return true
		}
		default:
			return false
	}
}

exports.formatDate = (date) => {
	const month = months[date.getMonth()]
	const day = date.getDate()
	const year = date.getFullYear()

	return `${month} ${day}, ${year}`
}
