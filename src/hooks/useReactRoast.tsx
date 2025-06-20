import { avoidElementClassName } from "../utils/classNames";
import useRoastWidget from "./useRoastWidget";

const useReactRoast = () => {
    const { active, toggleActive } = useRoastWidget();
    return { isWidgetActive: active, toggleWidget: toggleActive, avoidElementClassName };
};

export default useReactRoast;
