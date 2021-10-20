import React from "react";
import { useParams } from "react-router";

const Collections = () => {
	const { id } = useParams()
	return (
		<>
			{id}
		</>
	)
}

export default Collections
