const { formatDuration, intervalToDuration } = require("date-fns")

export const minutesToMs = (min) => min * 60 * 1000

const intervalToFormattedDuration = (interval) => formatDuration(
	intervalToDuration({
		start: Date.now(),
		end: Date.now() + interval,
	})
)

export default intervalToFormattedDuration