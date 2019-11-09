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

const validateField = (type, value) => {
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

	const validPlatforms = [
		'PC',
		'PS5',
		'PS4',
		'PS3',
		'PS2',
		'PS1',
		'Switch',
		'WiiU',
		'Wii',
		'GC',
		'N64',
		'SNES',
		'NES',
		'GameBoy',
		'3DS',
		'DS',
		'Saturn',
		'Genesis',
		'NeoGeo',
		'X360',
		'XBone',
		'Vita',
		'PSP'
	]

	const twoDigit = /^[0-9]{1,2}$/
	const score = /^[0-9]{1,2}([.][5]{1})?$/
	const fourDigit = /^[0-9]{1,4}$/
	const hours = /^[0-9]{1,4}([.][5]{1})?$/

	switch (type) {
		case 'title': {
			if (
				value === '' ||
				value.length < 2
			) {
				return false
			} else {
				return true
			}
		}
		case 'release': {
			if (value.includes(',')) {
				value = value.replace(/,/g, '')
			}

			const dateParts = value.split(' ')

			const now = new Date()

			if (
				dateParts.length < 3 ||
				!months.includes(dateParts[0]) ||
				!dateParts[1].match(twoDigit) ||
				(parseInt(dateParts[1]) <= 0 || parseInt(dateParts[1]) > 31) ||
				!dateParts[2].match(fourDigit) ||
				(parseInt(dateParts[2]) < 1970 || parseInt(dateParts[2]) > now.getFullYear() + 3)
			) {
				return false
			} else {
				return true
			}
		}
		case 'score': {
			if (
				value === '' ||
				!value.match(score) ||
				parseInt(value) < 1 ||
				parseFloat(value) > 10
			) {
				return false
			} else {
				return true
			}
		}
		case 'start': {
			let dateStarted = value.dateStarted

			if (dateStarted.includes(',')) {
				dateStarted = dateStarted.replace(/,/g, '')
			}

			const dateParts = dateStarted.split(' ')

			const now = new Date()

			if (
				dateParts.length < 3 ||
				!months.includes(dateParts[0]) ||
				!dateParts[1].match(twoDigit) ||
				(parseInt(dateParts[1]) <= 0 || parseInt(dateParts[1]) > 31) ||
				!dateParts[2].match(fourDigit) ||
				(parseInt(dateParts[2]) < 1970 || parseInt(dateParts[2]) > now.getFullYear() + 3) ||
				new Date(value.dateStarted).getTime() < new Date(value.releaseDate).getTime() - 60 * 60 * 24 * 2 * 1000 ||
				new Date(value.dateStarted) > new Date()
			) {
				return false
			} else {
				return true
			}
		}
		case 'finish': {
			let dateFinished = value.dateFinished

			if (dateFinished.includes(',')) {
				dateFinished = dateFinished.replace(/,/g, '')
			}

			const dateParts = dateFinished.split(' ')

			const now = new Date()

			if (
				dateParts.length < 3 ||
				!months.includes(dateParts[0]) ||
				!dateParts[1].match(twoDigit) ||
				(parseInt(dateParts[1]) <= 0 || parseInt(dateParts[1]) > 31) ||
				!dateParts[2].match(fourDigit) ||
				(parseInt(dateParts[2]) < 2015 || parseInt(dateParts[2]) > now.getFullYear()) ||
				new Date(value.dateFinished) < new Date(value.dateStarted) ||
				new Date(value.dateFinished) > new Date()
			) {
				return false
			} else {
				return true
			}
		}
		case 'hours': {
			if (!value.match(hours) || parseInt(value) <= 0) {
				return false
			} else {
				return true
			}
		}
		case 'completed': {
			if (
				!value.match(twoDigit) ||
				parseInt(value) < 0
			) {
				return false
			} else {
				return true
			}
		}
		case 'platform': {
			if (value === '' || !validPlatforms.includes(value)) {
				return false
			} else {
				return true
			}
		}
		default:
			return false
	}
}
