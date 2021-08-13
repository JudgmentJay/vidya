exports.getStats = (games, year) => {
	const gamesPlayed = games.length
	let gamesCompleted = 0
	let totalHoursPlayed = 0
	let totalPlaythroughs = 0

	const gamesWithHoursAndPlaythroughData = []
	const scores = []
	const platforms = {}

	const gamesAccountedForInPlatformData = []

	games.forEach((game) => {
		let hoursPlayed = 0
		let finishedPlaythroughCount = 0

		let playthroughs = game.playthroughs

		if (year) {
			playthroughs = playthroughs.filter((playthrough) => {
				const playthroughYear = new Date(playthrough.dateFinished).getFullYear()

				return playthroughYear === year
			})
		}

		playthroughs.forEach((playthrough) => {
			totalHoursPlayed += playthrough.hoursPlayed
			hoursPlayed += playthrough.hoursPlayed
			totalPlaythroughs += playthrough.timesCompleted
			finishedPlaythroughCount += playthrough.timesCompleted

			const platformData = platforms[playthrough.platform]
			const key = `${game.title}-${playthrough.platform}`

			if (platformData) {
				platformData.hours += playthrough.hoursPlayed

				if (!gamesAccountedForInPlatformData.includes(key)) {
					platformData.completed += playthrough.timesCompleted ? 1 : 0
					platformData.dropped += playthrough.timesCompleted ? 0 : 1

					gamesAccountedForInPlatformData.push(key)
				}
			} else {
				platforms[playthrough.platform] = {
					completed: playthrough.timesCompleted ? 1 : 0,
					dropped: playthrough.timesCompleted ? 0 : 1,
					hours: playthrough.hoursPlayed
				}

				gamesAccountedForInPlatformData.push(key)
			}
		})

		if (finishedPlaythroughCount) {
			gamesCompleted += 1
		}

		gamesWithHoursAndPlaythroughData.push({
			gameData: game,
			hoursPlayed,
			playthroughCount: finishedPlaythroughCount
		})

		scores.push(game.score)
	})

	const platformData = Object.entries(platforms).sort((platformA, platformB) => {
		if (platformA[1].completed < platformB[1].completed) return 1
		if (platformA[1].completed > platformB[1].completed) return -1

		if (platformA[0].toLowerCase() < platformB[0].toLowerCase()) return 1
		if (platformA[0].toLowerCase() > platformB[0].toLowerCase()) return -1

		return 0
	})

	const topGamesByHoursPlayed = sortGames(gamesWithHoursAndPlaythroughData, 'hoursPlayed')

	const gamesWithMultiplePlaythroughs = gamesWithHoursAndPlaythroughData.filter((game) => game.playthroughCount > 1)
	const topGamesByPlaythroughCount = sortGames(gamesWithMultiplePlaythroughs, 'playthroughCount')

	const totalPoints = scores.length
		? scores.reduce((acc, cur) => acc + cur)
		: 0
	const averageScore = (totalPoints / scores.length).toFixed(2)

	return({
		gamesPlayed,
		gamesCompleted,
		totalHoursPlayed,
		totalPlaythroughs,
		topGamesByHoursPlayed,
		topGamesByPlaythroughCount,
		platformData,
		averageScore
	})
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
