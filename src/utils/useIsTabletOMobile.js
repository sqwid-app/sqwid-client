import { useMediaQuery } from 'react-responsive'

const useIsTabletOrMobile = () => {
	return useMediaQuery({ query: '(max-width: 1024px)' })
}

export default useIsTabletOrMobile