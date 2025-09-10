import { FloatingArrow, arrow, autoPlacement, autoUpdate, offset, shift, useFloating } from "@floating-ui/react";
import { activeElementClassName, avoidElementClassName, popoverElmentClassName } from "../../utils/classNames";
import { useState, useEffect, useRef } from "react";
import WidgetForm from "../WidgetForm";
import "./styles.css";
import clsx from "clsx";

const WidgetPopper: React.FC = () => {
    const arrowRef = useRef<SVGSVGElement>(null);
    const [referenceElement, setReferenceElement] = useState<HTMLElement | null>(null);

    useEffect(() => {
        const element = document.querySelector(`.${activeElementClassName}`) as HTMLElement | null;
        setReferenceElement(element);
    }, []);

    const { refs, floatingStyles, placement, context } = useFloating({
        elements: { reference: referenceElement },
        whileElementsMounted: autoUpdate,
        middleware: [offset(24), shift({ crossAxis: true }), autoPlacement(), arrow({ element: arrowRef })],
    });

    return (
        <div
            ref={refs.setFloating}
            data-placement={placement}
            style={{ ...floatingStyles, zIndex: 1000000 }}
            className={clsx(popoverElmentClassName, avoidElementClassName)}
        >
            <WidgetForm />
            <FloatingArrow className="arrow" ref={arrowRef} context={context} />
        </div>
    );
};

export default WidgetPopper;
