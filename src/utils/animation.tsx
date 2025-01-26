export const SlideUp = (delay: any) => {
	return {
		hidden: {
			opacity: 0,
			y: 100,
		},
		visible: {
			opacity: 1,
			y: 0,
			transition: {
				duration: 1,
				delay: delay,
			},
		},
	};
};
export const SlideLeft = (delay: any) => {
	return {
		hidden: {
			opacity: 0,
			x: 100,
		},
		visible: {
			opacity: 1,
			x: 0,
			transition: {
				duration: 1,
				delay: delay,
			},
		},
	};
};
export const SlideRight = (delay: any) => {
	return {
		hidden: {
			opacity: 0,
			x: -100,
		},
		visible: {
			opacity: 1,
			x: 0,
			transition: {
				duration: 1,
				delay: delay,
			},
		},
	};
};
export const SlideUpWithRotation = (delay: number) => {
	return {
		hidden: {
			opacity: 0,
			y: 100, // Starts off-screen vertically
			rotate: -45, // Starts with a rotation
		},
		visible: {
			opacity: 1,
			y: 0, // Ends at the final position
			rotate: 0, // Ends at the original orientation
			transition: {
				duration: 1.2, // Animation duration
				delay: delay,
				ease: "easeInOut", // Smooth easing
			},
		},
	};
};

export const DriveFromRight = (delay: number) => {
	return {
		hidden: {
			opacity: 0,
			x: "100vw", // Starts off-screen (to the right)
			rotate: 0,
		},
		visible: {
			opacity: 1,
			x: 0, // Ends at the original position (left side of the screen)
			rotate: 0, // No rotation in this case, you can add tilt if needed
			transition: {
				duration: 2, // Duration of the movement
				delay: delay,
				ease: "easeInOut", // Smooth ease-in-out
			},
		},
	};
};
