const { formatDuration, intervalToDuration } = require("date-fns");

const intervalToFormattedDuration = interval =>
	formatDuration(
		intervalToDuration({
			start: Date.now(),
			end: Date.now() + interval,
		})
	);

export default intervalToFormattedDuration;
