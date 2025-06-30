import { useState, useEffect, useCallback } from "react";
import html2canvas from "html2canvas-pro";

import { ToastProvider } from "../Toaster";
import WidgetButton from "../WidgetButton";
import WidgetOverlay from "../WidgetOverlay";
import { RoastWidgetContext } from "../../utils/context";
import getBackgroundColor from "../../utils/getBackgroundColor";
import { ScreenshotBlobs, SelectedElement, Size, WidgetProviderProps } from "../../utils/types";

import {
    activeElementClassName,
    avoidElementClassName,
    buttonElmentClassName,
    overlayElmentClassName,
    popoverElmentClassName,
} from "../../utils/classNames";

const initialSelectedValue: SelectedElement = {
    position: { x: 0, y: 0 },
    size: { width: 0, height: 0 },
    isSelected: false,
};

function Provider({
    siteId,
    children,
    customize,
    onFormSubmit,
    mode = "remote",
    hideIsland = false,
}: WidgetProviderProps) {
    const [windowSize, setWindowSize] = useState<Size>({
        width: typeof window !== "undefined" ? window.innerWidth : 0,
        height: typeof window !== "undefined" ? window.innerHeight : 0,
    });
    const [selected, setSelected] = useState<SelectedElement>(initialSelectedValue);
    const [screenshotBlobs, setScreenshotBlobs] = useState<ScreenshotBlobs>([]);
    const [IslandHidden, setIslandHidden] = useState<boolean>(false);
    const [active, setActive] = useState<boolean>(false);

    const toggleActive = useCallback(() => setActive((prev) => !prev), []);
    const setIslandVisiblity = useCallback((v: boolean) => setIslandHidden(!v), []);

    useEffect(() => {
        if (hideIsland) setIslandHidden(true);
        return () => setIslandHidden(false);
    }, [hideIsland]);

    const setElementHoverable = (isHoverable: boolean) => {
        if (isHoverable) {
            document.body.dataset.roastActive = "true";
        } else {
            delete document.body.dataset.roastActive;
        }
    };

    const unSelectElement = useCallback(() => {
        setScreenshotBlobs([]);
        setElementHoverable(true);
        setSelected(initialSelectedValue);
    }, []);

    const takeScreenshot = async (element: HTMLElement) => {
        const backgroundColor = getBackgroundColor(element);

        // Take screenshot of selected element
        // TODO: Handle errors in screenshot capture
        // Error: Unable to find element in cloned iframe
        await html2canvas(element, { backgroundColor }).then((canvas) => {
            canvas.toBlob(
                (blob) => blob && setScreenshotBlobs((prev) => [...prev, { type: "selected-screenshot", blob }]),
                "image/png"
            );
        });

        const ignoreElementClassNames = [popoverElmentClassName, buttonElmentClassName, overlayElmentClassName];

        // Take screenshot of full page
        await html2canvas(document.body, {
            useCORS: true,
            foreignObjectRendering: true,
            ignoreElements: (element: Element): boolean => {
                // Ignore elements that should not be captured
                return ignoreElementClassNames.some((cn: string) => element.classList.contains(cn));
            },
        }).then((canvas) => {
            canvas.toBlob(
                (blob) => blob && setScreenshotBlobs((prev) => [...prev, { type: "full-screenshot", blob }]),
                "image/png"
            );
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

        const handleClick = async (e: MouseEvent) => {
            const currentElement = e.target as HTMLElement;

            if (
                document.querySelector(`.${popoverElmentClassName}`)?.contains(currentElement) ||
                document.querySelector(`.${buttonElmentClassName}`)?.contains(currentElement) ||
                document.querySelector(`.${avoidElementClassName}`)?.contains(currentElement)
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

            document.querySelector(`.${activeElementClassName}`)?.classList.remove(activeElementClassName);
            currentElement.classList.add(activeElementClassName);

            await takeScreenshot(currentElement);
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
                siteId,
                active,
                selected,
                customize,
                windowSize,
                IslandHidden,
                onFormSubmit,
                toggleActive,
                unSelectElement,
                screenshotBlobs,
                setIslandVisiblity,
            }}
        >
            {children}
        </RoastWidgetContext.Provider>
    );
}

const WidgetProvider = ({ children, ...props }: WidgetProviderProps) => (
    <Provider {...props}>
        <ToastProvider
            position={props.customize?.island?.placement === "bottom-right" ? "top-right" : "bottom-right"}
            max={10}
        >
            {children}
            <WidgetButton />
            <WidgetOverlay />
        </ToastProvider>
    </Provider>
);

export default WidgetProvider;
