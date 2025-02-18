import useRoastWidget from "../../hooks/useRoastWidget";
import defaultCustomize from "../../utils/defaultCustomize";
import { buttonElmentClassName } from "../WidgetProvider";
import "./styles.css";

function WidgetButton() {
	const { active, customize, setActive, disable } = useRoastWidget();

	if (disable) return null;

	return (
		<div
			data-direction={customize?.island?.direction || defaultCustomize.island?.direction}
			className={`${buttonElmentClassName} ${customize?.island?.className || ""}`}
			onClick={() => setActive(!active)}
		>
			<p>{customize?.island?.label || defaultCustomize.island?.label}</p>
			<div className="switch-btn" data-active={active}>
				<span className="circle" />
			</div>
		</div>
	);
}

export default WidgetButton;
