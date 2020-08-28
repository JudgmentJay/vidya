exports.getStats = (games, year) => {
	const gamesPlayed = games.length

	const gamesCompleted = games.filter((game) => {
		let completedPlaythroughs = game.playthroughs.filter((playthrough) => playthrough.dateFinished && playthrough.timesCompleted)

		if (year) {
			completedPlaythroughs = completedPlaythroughs.filter((playthrough) => new Date(playthrough.dateFinished).getFullYear() === year)
		}

		return completedPlaythroughs.length > 0
	}).length

	let totalHoursPlayed = 0
	let totalPlaythroughs = 0

	const gameHoursPlayed = []
	const gamePlaythroughCounts = []
	const scores = []
	const platforms = {}

	games.forEach((game) => {
		let hoursPlayed = 0
		let timesCompleted = 0

		let playthroughsCompletedInCurrentYear = game.playthroughs.filter((playthrough) => playthrough.dateFinished)

		if (year) {
			playthroughsCompletedInCurrentYear = playthroughsCompletedInCurrentYear.filter((playthrough) => new Date(playthrough.dateFinished).getFullYear() === year)
		}

		playthroughsCompletedInCurrentYear.forEach((playthrough) => {
			hoursPlayed += playthrough.hoursPlayed
			totalHoursPlayed += playthrough.hoursPlayed

			timesCompleted += playthrough.timesCompleted
			totalPlaythroughs += playthrough.timesCompleted

			if (!platforms[playthrough.platform]) {
				platforms[playthrough.platform] = 1
			} else {
				platforms[playthrough.platform] += 1
			}
		})

		gameHoursPlayed.push({
			gameData: game,
			hoursPlayed: hoursPlayed
		})

		if (timesCompleted > 1) {
			gamePlaythroughCounts.push({
				gameData: game,
				timesCompleted
			})
		}

		scores.push(game.score)
	})

	const platformData = Object.entries(platforms).sort((platformA, platformB) => {
		if (platformA[1] < platformB[1]) return 1
		if (platformA[1] > platformB[1]) return -1

		if (platformA[0].toLowerCase() < platformB[0].toLowerCase()) return 1
		if (platformA[0].toLowerCase() > platformB[0].toLowerCase()) return -1

		return 0
	})

	const topGamesByHoursPlayed = gameHoursPlayed
		.sort((gameA, gameB) => {
			if (gameB.hoursPlayed > gameA.hoursPlayed) return 1
			if (gameB.hoursPlayed < gameA.hoursPlayed) return -1

			if (gameB.gameData.title.toLowerCase() < gameA.gameData.title.toLowerCase()) return 1
			if (gameB.gameData.title.toLowerCase() > gameA.gameData.title.toLowerCase()) return -1

			return 0
		})
		.slice(0, 5)

	const topGamesByPlaythroughCount = gamePlaythroughCounts
		.sort((gameA, gameB) => {
			if (gameB.timesCompleted > gameA.timesCompleted) return 1
			if (gameB.timesCompleted < gameA.timesCompleted) return -1

			if (gameB.gameData.title.toLowerCase() < gameA.gameData.title.toLowerCase()) return 1
			if (gameB.gameData.title.toLowerCase() > gameA.gameData.title.toLowerCase()) return -1

			return 0
		})
		.slice(0, 5)

	const totalPoints = scores.length
		? scores.reduce((acc, cur) => acc + cur)
		: 0
	const averageScore = (totalPoints / scores.length).toFixed(1)

	return({
		gamesPlayed,
		gamesCompleted,
		totalPlaythroughs,
		totalHoursPlayed,
		topGamesByHoursPlayed,
		topGamesByPlaythroughCount,
		platformData,
		averageScore
	})
}
