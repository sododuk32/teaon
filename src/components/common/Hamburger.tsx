type IconProps = {
	color?: string;
	width?: number;
	height?: number;
};

const Hamburger = ({ color, width, height }: IconProps) => {
	return (
		<>
			<svg
				id='Icons'
				viewBox={`0 0 30 30`}
				width={`${width}vw`}
				height={`${height}vh`}
				xmlns='http://www.w3.org/2000/svg'
			>
				<path
					fill={color}
					className='cls-1'
					d='M3.04,10l25.92,0c0-3.07,0-2.83,0-4L3.04,6C3.04,9.2,3.04,7.42,3.04,10z M28.96,14L3.04,14c0,2.5,0,2.15,0,4l25.92,0
					C28.96,15.2,28.96,16.54,28.96,14z M28.96,22L3.04,22c0,2.37,0,2.37,0,4l25.92,0C28.96,23.49,28.96,24.74,28.96,22z'
				/>
			</svg>
		</>
	);
};

export default Hamburger;
