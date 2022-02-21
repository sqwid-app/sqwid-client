/* eslint-disable react/self-closing-comp */
import React, { useEffect, useRef, } from 'react';
import PropTypes from 'prop-types';
import PlyrJS from 'plyr';

var __rest = (this && this.__rest) || function (s, e) {
	var t = {};
	for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
		t[p] = s[p];
	if (s != null && typeof Object.getOwnPropertySymbols === "function")
		//eslint-disable-next-line
		for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
			if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
				t[p[i]] = s[p[i]];
		}
	return t;
};

export const Plyr = React.forwardRef((props, ref) => {
	const { options = null, source } = props, rest = __rest(props, ["options", "source"]);
	const innerRef = useRef();
	useEffect(() => {
		var _a;
		if (!innerRef.current)
			return;
		if (!((_a = innerRef.current) === null || _a === void 0 ? void 0 : _a.plyr)) {
			innerRef.current.plyr = new PlyrJS('.plyr-react', options !== null && options !== void 0 ? options : {});
		}
		if (typeof ref === 'function') {
			if (innerRef.current)
				ref(innerRef.current);
		}
		else {
			if (ref && innerRef.current)
				ref.current = innerRef.current;
		}
		if (innerRef.current && source) {
			innerRef.current.plyr.source = source;
		}
	}, [ref, options, source]);
	return (React.createElement("video", Object.assign({ ref: innerRef, className: "plyr-react plyr" }, rest)));
});
Plyr.displayName = 'Plyr';
Plyr.defaultProps = {
	options: {
		controls: [
			'rewind',
			'play',
			'fast-forward',
			'progress',
			'current-time',
			'duration',
			'mute',
			'volume',
			'settings',
			'fullscreen',
		],
		i18n: {
			restart: 'Restart',
			rewind: 'Rewind {seektime}s',
			play: 'Play',
			pause: 'Pause',
			fastForward: 'Forward {seektime}s',
			seek: 'Seek',
			seekLabel: '{currentTime} of {duration}',
			played: 'Played',
			buffered: 'Buffered',
			currentTime: 'Current time',
			duration: 'Duration',
			volume: 'Volume',
			mute: 'Mute',
			unmute: 'Unmute',
			enableCaptions: 'Enable captions',
			disableCaptions: 'Disable captions',
			download: 'Download',
			enterFullscreen: 'Enter fullscreen',
			exitFullscreen: 'Exit fullscreen',
			frameTitle: 'Player for {title}',
			captions: 'Captions',
			settings: 'Settings',
			menuBack: 'Go back to previous menu',
			speed: 'Speed',
			normal: 'Normal',
			quality: 'Quality',
			loop: 'Loop',
		},
	},
	source: {
		type: 'video',
		sources: [
			{
				src: 'https://rawcdn.githack.com/chintan9/Big-Buck-Bunny/e577fdbb23064bdd8ac4cecf13db86eef5720565/BigBuckBunny720p30s.mp4',
				type: 'video/mp4',
				size: 720,
			},
			{
				src: 'https://rawcdn.githack.com/chintan9/Big-Buck-Bunny/e577fdbb23064bdd8ac4cecf13db86eef5720565/BigBuckBunny1080p30s.mp4',
				type: 'video/mp4',
				size: 1080,
			},
		],
	},
};
Plyr.propTypes = {
	options: PropTypes.object,
	source: PropTypes.any,
};
export default Plyr;