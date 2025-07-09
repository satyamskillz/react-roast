import { FloatingArrow, arrow, autoPlacement, autoUpdate, offset, shift, useFloating } from "@floating-ui/react";
import { activeElementClassName, popoverElmentClassName } from "../../utils/classNames";
import { useState, useEffect, useRef } from "react";
import WidgetForm from "../WidgetForm";
import "./styles.css";

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
            className={popoverElmentClassName}
            style={{ ...floatingStyles, zIndex: 1000000 }}
        >
            <WidgetForm />
            <FloatingArrow className="arrow" ref={arrowRef} context={context} />
        </div>
    );
};

export default WidgetPopper;
