import { useEffect, useState, useRef } from "react";

const useOnScreen = ref => {
	const [isOnScreen, setIsOnScreen] = useState(false);
	const observerRef = useRef(null);

	const addObserverIfDesiredNodeAvailable = () => {
		var composeBox = ref.current;
		if (!composeBox) {
			setTimeout(addObserverIfDesiredNodeAvailable, 250);
			return;
		}
		observerRef.current.observe(composeBox);
	};

	useEffect(() => {
		observerRef.current = new IntersectionObserver(([entry]) =>
			setIsOnScreen(entry.isIntersecting)
		);
	}, []);

	useEffect(() => {
		addObserverIfDesiredNodeAvailable();
		return () => observerRef.current.disconnect();
		//eslint-disable-next-line
	}, [ref]);

	return isOnScreen;
};

export default useOnScreen;
