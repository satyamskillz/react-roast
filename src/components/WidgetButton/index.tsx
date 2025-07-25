import { buttonElmentClassName } from "../../utils/classNames";
import defaultCustomize from "../../utils/defaultCustomize";
import useRoastWidget from "../../hooks/useRoastWidget";
import clsx from "clsx";
import "./styles.css";

function WidgetButton() {
    const { active, customize, toggleActive, IslandHidden } = useRoastWidget();
    if (IslandHidden) return null;

    return (
        <div
            data-placement={customize?.island?.placement || defaultCustomize.island?.placement}
            className={clsx(buttonElmentClassName, customize?.island?.className)}
            onClick={toggleActive}
        >
            <p>{customize?.island?.label || defaultCustomize.island?.label}</p>
            <div className={clsx("switch-btn", customize?.island?.switchButton?.className)} data-active={active}>
                <span className={clsx("circle", customize?.island?.switchButton?.thumb?.className)} />
            </div>
        </div>
    );
}

export default WidgetButton;
