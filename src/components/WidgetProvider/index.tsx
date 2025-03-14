import { useState, useEffect, useCallback } from "react";
import html2canvas from "html2canvas";

import WidgetButton from "../WidgetButton";
import WidgetOverlay from "../WidgetOverlay";
import { RoastWidgetContext } from "../../utils/context";
import { SelectedElement, Size, WidgetProviderProps } from "../../utils/types";

export const activeElementClassName = "roast-active-element";
export const popoverElmentClassName = "roast-widget-popover";
export const overlayElmentClassName = "roast-widget-overlay";
export const buttonElmentClassName = "roast-widget-button";

const initialSelectedValue: SelectedElement = {
	position: { x: 0, y: 0 },
	size: { width: 0, height: 0 },
	isSelected: false,
};

function Provider({
	children,
	customize,
	onFormSubmit,
	disable = false,
	mode = "remote",
}: WidgetProviderProps) {
	const [windowSize, setWindowSize] = useState<Size>({
		width: typeof window !== "undefined" ? window.innerWidth : 0,
		height: typeof window !== "undefined" ? window.innerHeight : 0,
	});
	const [selected, setSelected] = useState<SelectedElement>(initialSelectedValue);
	const [elementImageBlob, setElementImageBlob] = useState<Blob | null>(null);
	const [active, setActive] = useState<boolean>(false);

	const setElementHoverable = (isHoverable: boolean) => {
		if (isHoverable) {
			document.body.dataset.roastActive = "true";
		} else {
			delete document.body.dataset.roastActive;
		}
	};

	const unSelectElement = useCallback(() => {
		setElementHoverable(true);
		setElementImageBlob(null);
		setSelected(initialSelectedValue);
	}, []);

	const takeScreenshot = (element: HTMLElement) => {
		html2canvas(element).then((canvas) => {
			canvas.toBlob((blob) => blob && setElementImageBlob(blob), "image/png");
		});
	};

	useEffect(() => setElementHoverable(active), [active]);

	useEffect(() => {
		if (!active) return;

		const handleResize = () => {
			setWindowSize({
				width: window.innerWidth,
				height: window.innerHeight,
			});
			updateSelectedElement();
		};

		const handleScroll = () => updateSelectedElement();

		window.addEventListener("scroll", handleScroll);
		window.addEventListener("resize", handleResize);
		return () => {
			window.removeEventListener("resize", handleResize);
			window.removeEventListener("scroll", handleScroll);
		};
	}, [active]);

	useEffect(() => {
		if (!active) return;

		const handleClick = (e: MouseEvent) => {
			const currentElement = e.target as HTMLElement;

			if (
				document.querySelector(`.${popoverElmentClassName}`)?.contains(currentElement) ||
				document.querySelector(`.${buttonElmentClassName}`)?.contains(currentElement)
			) {
				return;
			}

			e.preventDefault();
			e.stopPropagation();

			if (document.querySelector(`.${overlayElmentClassName}`)?.contains(currentElement)) {
				unSelectElement();
				return;
			}

			const rect = currentElement.getBoundingClientRect();
			setSelected({
				position: { x: rect.left, y: rect.top },
				size: { width: rect.width, height: rect.height },
				isSelected: true,
			});

			setElementHoverable(false);

			document
				.querySelector(`.${activeElementClassName}`)
				?.classList.remove(activeElementClassName);
			currentElement.classList.add(activeElementClassName);

			takeScreenshot(currentElement);
		};

		window.addEventListener("click", handleClick, true);
		return () => window.removeEventListener("click", handleClick, true);
	}, [active, unSelectElement]);

	const updateSelectedElement = () => {
		const element = document.querySelector(`.${activeElementClassName}`) as HTMLElement | null;
		if (!element) return;

		const rect = element.getBoundingClientRect();
		setSelected((prevSelected) => ({
			...prevSelected,
			position: { x: rect.left, y: rect.top },
			size: { width: rect.width, height: rect.height },
		}));
	};

	return (
		<RoastWidgetContext.Provider
			value={{
				mode,
				active,
				disable,
				selected,
				setActive,
				customize,
				windowSize,
				onFormSubmit,
				unSelectElement,
				elementImageBlob,
			}}
		>
			{children}
		</RoastWidgetContext.Provider>
	);
}

const WidgetProvider = ({ children, ...props }: WidgetProviderProps) => (
	<Provider {...props}>
		{children}
		<WidgetButton />
		<WidgetOverlay />
	</Provider>
);

export default WidgetProvider;
