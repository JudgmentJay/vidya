exports.getStats = (games, year) => {
	const gameData = games.map((game) => {
		let playthroughs = game.playthroughs

		if (year) {
			playthroughs = filterPlaythroughs(playthroughs, year)
		}

		const gameStats = getGameStats(game, playthroughs)

		return {
			gameData: game,
			hoursPlayed: gameStats.hoursPlayed,
			playthroughCount: gameStats.playthroughCount,
			platforms: gameStats.platforms
		}
	})

	const totalStats = getTotals(gameData)

	const topGamesByHoursPlayed = sortGames(gameData, 'hoursPlayed')

	const gamesWithMultiplePlaythroughs = gameData.filter((game) => game.playthroughCount > 1)
	const topGamesByPlaythroughCount = sortGames(gamesWithMultiplePlaythroughs, 'playthroughCount')

	const platformData = Object.entries(totalStats.platforms).sort((platformA, platformB) => {
		if (platformA[1].completed < platformB[1].completed) return 1
		if (platformA[1].completed > platformB[1].completed) return -1

		if (platformA[0].toLowerCase() < platformB[0].toLowerCase()) return 1
		if (platformA[0].toLowerCase() > platformB[0].toLowerCase()) return -1

		return 0
	})

	const totalPoints = totalStats.scores.reduce((acc, cur) => acc + cur, 0)
	const averageScore = (totalPoints / totalStats.scores.length).toFixed(2)

	return ({
		gamesPlayed: totalStats.gamesPlayed,
		gamesCompleted: totalStats.gamesCompleted,
		totalHoursPlayed: totalStats.totalHoursPlayed,
		totalPlaythroughs: totalStats.totalPlaythroughs,
		topGamesByHoursPlayed,
		topGamesByPlaythroughCount,
		platformData,
		averageScore
	})
}

const filterPlaythroughs = (playthroughs, year) => {
	return playthroughs.filter((playthrough) => {
		const playthroughYear = new Date(playthrough.dateFinished).getFullYear()

		return playthroughYear === year
	})
}

const getGameStats = (game, playthroughs) => {
	let hoursPlayed = 0
	let playthroughCount = 0
	const platforms = {}

	playthroughs.forEach((playthrough) => {
		hoursPlayed += playthrough.hoursPlayed
		playthroughCount += playthrough.timesCompleted

		if (!platforms[playthrough.platform]) {
			platforms[playthrough.platform] = {
				hours: 0,
				completed: 0,
				dropped: 0
			}
		}

		platforms[playthrough.platform].hours += playthrough.hoursPlayed
		platforms[playthrough.platform].completed += playthrough.timesCompleted ? 1 : 0
		platforms[playthrough.platform].dropped += playthrough.timesCompleted ? 0 : 1
	})

	return {
		hoursPlayed,
		playthroughCount,
		platforms
	}
}

const getTotals = (gameData) => {
	const gamesPlayed = gameData.length
	let gamesCompleted = 0
	let totalHoursPlayed = 0
	let totalPlaythroughs = 0
	const platforms = {}
	const scores = []

	gameData.forEach((game) => {
		if (game.playthroughCount) {
			gamesCompleted += 1
		}

		totalHoursPlayed += game.hoursPlayed
		totalPlaythroughs += game.playthroughCount
		scores.push(game.gameData.score)

		const platformData = Object.entries(game.platforms)

		platformData.forEach((platform) => {
			const platformName = platform[0]
			const platformStats = platform[1]

			if (!platforms[platformName]) {
				platforms[platformName] = {
					hours: 0,
					completed: 0,
					dropped: 0
				}
			}

			platforms[platformName].hours += platformStats.hours
			platforms[platformName].completed += platformStats.completed ? 1 : 0
			platforms[platformName].dropped += platformStats.completed ? 0 : 1
		})
	})

	return {
		gamesPlayed,
		gamesCompleted,
		totalHoursPlayed,
		totalPlaythroughs,
		platforms,
		scores
	}
}

const sortGames = (games, attribute) => {
	return [...games]
		.sort((gameA, gameB) => {
			if (gameB[attribute] > gameA[attribute]) return 1
			if (gameB[attribute] < gameA[attribute]) return -1

			if (gameB.gameData.title.toLowerCase() < gameA.gameData.title.toLowerCase()) return 1
			if (gameB.gameData.title.toLowerCase() > gameA.gameData.title.toLowerCase()) return -1

			return 0
		})
		.slice(0, 5)
}
