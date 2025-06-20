import { activeElementClassName, popoverElmentClassName } from "../../utils/classNames";
import { useState, useEffect } from "react";
import { usePopper } from "react-popper";
import WidgetForm from "../WidgetForm";
import "./styles.css";

const WidgetPopper: React.FC = () => {
    const [arrowElement, setArrowElement] = useState<HTMLDivElement | null>(null);
    const [popoverElement, setPopoverElement] = useState<HTMLDivElement | null>(null);
    const [referenceElement, setReferenceElement] = useState<HTMLElement | null>(null);

    useEffect(() => {
        const element = document.querySelector(`.${activeElementClassName}`) as HTMLElement | null;
        setReferenceElement(element);
    }, []);

    const { styles, attributes } = usePopper(referenceElement, popoverElement, {
        modifiers: [
            { name: "flip" },
            { name: "preventOverflow" },
            { name: "arrow", options: { element: arrowElement } },
            { name: "offset", options: { offset: [0, 24] } },
        ],
    });

    return (
        <div
            ref={setPopoverElement}
            className={popoverElmentClassName}
            style={{ ...styles.popper, zIndex: 1000000 }}
            {...attributes.popper}
        >
            <WidgetForm />
            <div ref={setArrowElement} className="arrow" />
        </div>
    );
};

export default WidgetPopper;
