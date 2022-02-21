import CollectibleContext from "@contexts/Collectible/CollectibleContext"
import { useContext, useEffect, useState } from "react"
import constants from "./constants"

// Hook to fetch all info about the current state from CollectibleContext
const useStateInfo = () => {
	const { collectibleInfo } = useContext(CollectibleContext)
	const getCurrentState = () => constants.STATE_TYPES_KEYS.filter(el =>
		collectibleInfo[el] !== null
	)
	const [currentState, setCurrentState] = useState(getCurrentState())
	useEffect(() => {
		setCurrentState(getCurrentState())
		//eslint-disable-next-line
	}, [collectibleInfo])
	return (currentState.length === 1) ? { ...collectibleInfo[currentState[0]], type: currentState[0] } : null
}

export default useStateInfo