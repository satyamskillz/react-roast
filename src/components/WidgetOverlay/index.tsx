import { overlayElmentClassName } from "../WidgetProvider";
import useRoastWidget from "../../hooks/useRoastWidget";
import WidgetPoppper from "../WidgetPopper";

import { Fragment } from "react";

const padding = 8;
const borderRadius = 4;

export default function WidgetOverlay() {
	const { active, selected, windowSize } = useRoastWidget();

	if (!active || !selected.isSelected) return null;

	let { x, y } = selected.position;
	const { width, height } = windowSize;
	let { width: w, height: h } = selected.size;

	// Adjust position and size by padding
	x -= padding;
	y -= padding;
	w += 2 * padding;
	h += 2 * padding;

	// Path for full-screen overlay with cutout effect and border radius
	const overlayPath = `
    M0 0 H${width} V${height} H0 Z
    M${x + borderRadius} ${y} 
    h${w - 2 * borderRadius} 
    a${borderRadius} ${borderRadius} 0 0 1 ${borderRadius} ${borderRadius} 
    v${h - 2 * borderRadius} 
    a${borderRadius} ${borderRadius} 0 0 1 -${borderRadius} ${borderRadius} 
    h-${w - 2 * borderRadius} 
    a${borderRadius} ${borderRadius} 0 0 1 -${borderRadius} -${borderRadius} 
    v-${h - 2 * borderRadius} 
    a${borderRadius} ${borderRadius} 0 0 1 ${borderRadius} -${borderRadius} 
    Z
  `;

	return (
		<Fragment>
			<svg
				width="100%"
				height="100%"
				version="1.1"
				xmlSpace="preserve"
				className={overlayElmentClassName}
				xmlns="http://www.w3.org/2000/svg"
				preserveAspectRatio="xMinYMin slice"
				viewBox={`0 0 ${width} ${height}`}
				style={{
					top: "0",
					left: "0",
					width: "100%",
					height: "100%",
					zIndex: 10000,
					position: "fixed",
					fillRule: "evenodd",
					clipRule: "evenodd",
					strokeMiterlimit: 2,
					strokeLinejoin: "round",
				}}
			>
				<path
					d={overlayPath}
					style={{
						fill: "rgba(64, 64, 64, 0.6)",
						cursor: "auto",
					}}
				/>
			</svg>
			<WidgetPoppper />
		</Fragment>
	);
}
