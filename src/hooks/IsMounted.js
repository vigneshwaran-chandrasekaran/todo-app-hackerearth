import { useEffect, useRef } from 'react';

export default function useIsMounted() {
	const isMounted = useRef(false);

	useEffect(() => {
		isMounted.current = true;
		return () => (isMounted.current = false);
	}, []);

	return isMounted;
}

// https://dev.to/alexandrudanpop/correctly-handling-async-await-in-react-components-part-2-4fl7
