import React from 'react';
import { useSelector } from 'react-redux';
import Lottie from 'react-lottie';
import animationData from '../../assets/Loader.json';

export default function Loader() {
	const loader = useSelector((state) => state.api.showLoader);

	const defaultOptions = {
		loop: true,
		autoplay: true,
		animationData,
		rendererSettings: {
			preserveAspectRatio: 'xMidYMid slice',
		},
	};

	return (
		<>
			{loader && (
				<div className="loaderbox">
					<Lottie options={defaultOptions} height={128} width={128} />
				</div>
			)}
		</>
	);
}
