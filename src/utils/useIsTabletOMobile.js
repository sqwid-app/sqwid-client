import { useMediaQuery } from 'react-responsive'

const useIsTabletOrMobile = () => {
	return useMediaQuery({ query: '(max-width: 992px)' })
}

export default useIsTabletOrMobile